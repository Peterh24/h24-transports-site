from __future__ import annotations

import queue
from dataclasses import dataclass

import numpy as np
import sounddevice as sd

from voice_notes.config import AudioConfig


@dataclass(slots=True)
class AudioFrame:
    pcm16: bytes
    samples: np.ndarray


class MicrophoneStream:
    def __init__(self, config: AudioConfig):
        self.config = config
        self._queue: queue.Queue[np.ndarray] = queue.Queue(maxsize=500)
        self._stream: sd.InputStream | None = None

    def _callback(self, indata, frames, time_info, status) -> None:
        if status:
            return
        try:
            self._queue.put_nowait(indata.copy().reshape(-1))
        except queue.Full:
            # On saturation we drop the chunk to keep real-time behavior.
            return

    def start(self) -> None:
        self._stream = sd.InputStream(
            samplerate=self.config.sample_rate,
            channels=self.config.channels,
            dtype="float32",
            device=self.config.device,
            blocksize=int(self.config.sample_rate * self.config.frame_ms / 1000),
            callback=self._callback,
        )
        self._stream.start()

    def read(self, timeout: float = 1.0) -> AudioFrame | None:
        try:
            chunk = self._queue.get(timeout=timeout)
        except queue.Empty:
            return None

        clipped = np.clip(chunk, -1.0, 1.0)
        pcm16 = (clipped * 32767).astype(np.int16)
        return AudioFrame(pcm16=pcm16.tobytes(), samples=chunk)

    def close(self) -> None:
        if self._stream is not None:
            self._stream.stop()
            self._stream.close()
            self._stream = None
