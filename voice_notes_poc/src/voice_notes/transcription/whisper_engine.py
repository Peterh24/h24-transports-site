from __future__ import annotations

import numpy as np
from faster_whisper import WhisperModel

from voice_notes.config import TranscriptionConfig
from voice_notes.models import TranscriptSegment


class WhisperTranscriber:
    def __init__(self, config: TranscriptionConfig):
        self.config = config
        self.model = WhisperModel(config.model_size, compute_type=config.compute_type)

    def transcribe(self, audio: np.ndarray, started_at, ended_at) -> TranscriptSegment | None:
        segments, info = self.model.transcribe(
            audio.astype(np.float32),
            language=self.config.language,
            beam_size=self.config.beam_size,
            vad_filter=False,
            condition_on_previous_text=False,
        )
        text = " ".join(seg.text.strip() for seg in segments).strip()
        if not text:
            return None

        confidence = info.language_probability if info.language_probability else 0.5
        return TranscriptSegment(
            text=text,
            started_at=started_at,
            ended_at=ended_at,
            confidence=max(0.0, min(1.0, confidence)),
        )
