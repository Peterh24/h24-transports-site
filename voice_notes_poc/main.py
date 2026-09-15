from __future__ import annotations

import argparse
from pathlib import Path

from voice_notes.config import AppConfig, AudioConfig, StorageConfig, TranscriptionConfig
from voice_notes.pipeline import VoiceNotesApp


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Assistant vocal local de prise de notes automatiques")
    parser.add_argument("--model-size", default="small", help="Taille du modèle faster-whisper (tiny, base, small, medium)")
    parser.add_argument("--compute-type", default="int8", help="Type de calcul faster-whisper (int8, float16, float32)")
    parser.add_argument("--output-dir", default="data", help="Répertoire de sortie pour SQLite et JSONL")
    parser.add_argument("--device", type=int, default=None, help="Index de périphérique micro sounddevice (optionnel)")
    return parser.parse_args()


def build_config(args: argparse.Namespace) -> AppConfig:
    return AppConfig(
        audio=AudioConfig(device=args.device),
        transcription=TranscriptionConfig(model_size=args.model_size, compute_type=args.compute_type),
        storage=StorageConfig(output_dir=Path(args.output_dir)),
    )


def main() -> None:
    args = parse_args()
    config = build_config(args)
    app = VoiceNotesApp(config)
    app.run_forever()


if __name__ == "__main__":
    main()
