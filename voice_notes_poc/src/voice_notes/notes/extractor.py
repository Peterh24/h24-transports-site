from __future__ import annotations

import re
from collections.abc import Iterable

from voice_notes.models import DetectedNote, TranscriptSegment

TASK_PREFIXES = (
    "il faut",
    "n'oublie pas",
    "n’oublie pas",
    "pense à",
    "à faire",
    "todo",
    "to do",
    "action",
)

NOTE_PREFIXES = (
    "note",
    "important",
    "retenir",
    "rappel",
)

SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+")


class NoteExtractor:
    def extract(self, transcript: TranscriptSegment) -> list[DetectedNote]:
        text = transcript.text.strip()
        if not text:
            return []

        sentences = [s.strip() for s in SENTENCE_SPLIT.split(text) if s.strip()]
        notes: list[DetectedNote] = []

        for sentence in sentences:
            lower = sentence.lower()
            if self._starts_with(lower, TASK_PREFIXES):
                notes.append(
                    DetectedNote(
                        kind="task",
                        content=sentence,
                        source_text=text,
                        speaker_id=transcript.speaker_id,
                    )
                )
            elif self._starts_with(lower, NOTE_PREFIXES):
                notes.append(
                    DetectedNote(
                        kind="note",
                        content=sentence,
                        source_text=text,
                        speaker_id=transcript.speaker_id,
                    )
                )

        if notes:
            return notes

        return [
            DetectedNote(
                kind="raw",
                content=text,
                source_text=text,
                speaker_id=transcript.speaker_id,
            )
        ]

    @staticmethod
    def _starts_with(sentence: str, prefixes: Iterable[str]) -> bool:
        return any(sentence.startswith(prefix) for prefix in prefixes)
