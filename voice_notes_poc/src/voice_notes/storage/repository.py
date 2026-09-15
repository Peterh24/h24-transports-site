from __future__ import annotations

import json
import sqlite3
from dataclasses import asdict
from datetime import datetime
from pathlib import Path

from voice_notes.config import StorageConfig
from voice_notes.models import DetectedNote, TranscriptSegment


class NoteRepository:
    def __init__(self, config: StorageConfig):
        self.config = config
        self.config.output_dir.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(self.config.sqlite_path)
        self._create_tables()

    def _create_tables(self) -> None:
        self.conn.execute(
            """
            CREATE TABLE IF NOT EXISTS transcripts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                started_at TEXT NOT NULL,
                ended_at TEXT NOT NULL,
                confidence REAL NOT NULL,
                speaker_id TEXT
            )
            """
        )
        self.conn.execute(
            """
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kind TEXT NOT NULL,
                content TEXT NOT NULL,
                source_text TEXT NOT NULL,
                created_at TEXT NOT NULL,
                speaker_id TEXT
            )
            """
        )
        self.conn.commit()

    def save_transcript(self, segment: TranscriptSegment) -> None:
        self.conn.execute(
            """
            INSERT INTO transcripts (text, started_at, ended_at, confidence, speaker_id)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                segment.text,
                segment.started_at.isoformat(),
                segment.ended_at.isoformat(),
                segment.confidence,
                segment.speaker_id,
            ),
        )
        self.conn.commit()

    def save_notes(self, notes: list[DetectedNote]) -> None:
        self.conn.executemany(
            """
            INSERT INTO notes (kind, content, source_text, created_at, speaker_id)
            VALUES (?, ?, ?, ?, ?)
            """,
            [
                (
                    note.kind,
                    note.content,
                    note.source_text,
                    note.created_at.isoformat(),
                    note.speaker_id,
                )
                for note in notes
            ],
        )
        self.conn.commit()

        with self.config.json_path.open("a", encoding="utf-8") as f:
            for note in notes:
                payload = asdict(note)
                payload["created_at"] = _to_iso(payload["created_at"])
                f.write(json.dumps(payload, ensure_ascii=False) + "\n")

    def close(self) -> None:
        self.conn.close()


def _to_iso(value: datetime | str) -> str:
    if isinstance(value, datetime):
        return value.isoformat()
    return str(value)
