from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Literal


NoteType = Literal["task", "note", "raw"]


@dataclass(slots=True)
class TranscriptSegment:
    text: str
    started_at: datetime
    ended_at: datetime
    confidence: float
    speaker_id: str | None = None


@dataclass(slots=True)
class DetectedNote:
    kind: NoteType
    content: str
    source_text: str
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    speaker_id: str | None = None
