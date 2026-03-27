from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass(slots=True)
class AudioConfig:
    sample_rate: int = 16_000
    channels: int = 1
    frame_ms: int = 30
    max_segment_seconds: float = 12.0
    end_silence_ms: int = 700
    device: int | None = None


@dataclass(slots=True)
class TranscriptionConfig:
    model_size: str = "small"
    language: str = "fr"
    beam_size: int = 5
    compute_type: str = "int8"


@dataclass(slots=True)
class StorageConfig:
    output_dir: Path = Path("data")
    sqlite_filename: str = "notes.db"
    json_filename: str = "notes.jsonl"

    @property
    def sqlite_path(self) -> Path:
        return self.output_dir / self.sqlite_filename

    @property
    def json_path(self) -> Path:
        return self.output_dir / self.json_filename


@dataclass(slots=True)
class AppConfig:
    audio: AudioConfig = field(default_factory=AudioConfig)
    transcription: TranscriptionConfig = field(default_factory=TranscriptionConfig)
    storage: StorageConfig = field(default_factory=StorageConfig)
