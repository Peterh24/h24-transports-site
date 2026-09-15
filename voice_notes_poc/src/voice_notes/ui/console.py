from __future__ import annotations

from rich.console import Console
from rich.table import Table

from voice_notes.models import DetectedNote


class ConsoleView:
    def __init__(self) -> None:
        self.console = Console()

    def print_header(self) -> None:
        self.console.print("[bold green]Assistant vocal de prise de notes (local)[/bold green]")
        self.console.print("Parlez dans le microphone. Ctrl+C pour arrêter.\n")

    def print_transcript(self, text: str) -> None:
        self.console.print(f"[cyan]Transcription:[/cyan] {text}")

    def print_notes(self, notes: list[DetectedNote]) -> None:
        table = Table(title="Notes détectées")
        table.add_column("Type", style="magenta")
        table.add_column("Contenu", style="white")
        table.add_column("Date (UTC)", style="dim")

        for note in notes:
            table.add_row(note.kind, note.content, note.created_at.isoformat(timespec="seconds"))

        self.console.print(table)
