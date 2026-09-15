from __future__ import annotations

from collections.abc import Iterator
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

import numpy as np
import webrtcvad

from voice_notes.audio.capture import AudioFrame
from voice_notes.config import AudioConfig


@dataclass(slots=True)
class SpeechSegment:
    audio: np.ndarray
    started_at: datetime
    ended_at: datetime


class Segmenter:
    def __init__(self, config: AudioConfig, aggressiveness: int = 2):
        self.config = config
        self.vad = webrtcvad.Vad(aggressiveness)
        self._active_frames: list[np.ndarray] = []
        self._segment_started_at: datetime | None = None
        self._silence_ms = 0
        self._max_frames = int((config.max_segment_seconds * 1000) / config.frame_ms)

    def process(self, frame: AudioFrame, frame_time: datetime) -> Iterator[SpeechSegment]:
        is_speech = self.vad.is_speech(frame.pcm16, self.config.sample_rate)

        if is_speech:
            if self._segment_started_at is None:
                self._segment_started_at = frame_time
            self._active_frames.append(frame.samples)
            self._silence_ms = 0
        elif self._active_frames:
            self._active_frames.append(frame.samples)
            self._silence_ms += self.config.frame_ms

        if not self._active_frames:
            return

        ended_for_silence = self._silence_ms >= self.config.end_silence_ms
        ended_for_length = len(self._active_frames) >= self._max_frames

        if ended_for_silence or ended_for_length:
            started_at = self._segment_started_at or frame_time
            segment_audio = np.concatenate(self._active_frames, axis=0)
            duration_ms = len(self._active_frames) * self.config.frame_ms
            ended_at = started_at + timedelta(milliseconds=duration_ms)
            yield SpeechSegment(audio=segment_audio, started_at=started_at, ended_at=ended_at)

            self._active_frames.clear()
            self._segment_started_at = None
            self._silence_ms = 0

    @staticmethod
    def now() -> datetime:
        return datetime.now(timezone.utc)
