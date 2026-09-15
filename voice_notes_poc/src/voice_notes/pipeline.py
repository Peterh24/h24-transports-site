from __future__ import annotations

from contextlib import suppress

from voice_notes.audio.capture import MicrophoneStream
from voice_notes.audio.vad import Segmenter
from voice_notes.config import AppConfig
from voice_notes.notes.extractor import NoteExtractor
from voice_notes.speaker.base import NoOpSpeakerIdentifier, SpeakerIdentifier
from voice_notes.storage.repository import NoteRepository
from voice_notes.transcription.whisper_engine import WhisperTranscriber
from voice_notes.ui.console import ConsoleView


class VoiceNotesApp:
    def __init__(self, config: AppConfig, speaker_identifier: SpeakerIdentifier | None = None):
        self.config = config
        self.mic = MicrophoneStream(config.audio)
        self.segmenter = Segmenter(config.audio)
        self.transcriber = WhisperTranscriber(config.transcription)
        self.extractor = NoteExtractor()
        self.repository = NoteRepository(config.storage)
        self.ui = ConsoleView()
        self.speaker_identifier = speaker_identifier or NoOpSpeakerIdentifier()

    def run_forever(self) -> None:
        self.ui.print_header()
        self.mic.start()

        try:
            while True:
                frame = self.mic.read(timeout=1.0)
                if frame is None:
                    continue

                now = self.segmenter.now()
                for segment in self.segmenter.process(frame, now):
                    speaker_id = self.speaker_identifier.identify(segment.audio)
                    transcript = self.transcriber.transcribe(segment.audio, segment.started_at, segment.ended_at)
                    if transcript is None:
                        continue

                    transcript.speaker_id = speaker_id
                    self.repository.save_transcript(transcript)
                    notes = self.extractor.extract(transcript)
                    self.repository.save_notes(notes)

                    self.ui.print_transcript(transcript.text)
                    self.ui.print_notes(notes)
        finally:
            with suppress(Exception):
                self.mic.close()
            with suppress(Exception):
                self.repository.close()
