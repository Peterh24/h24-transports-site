from __future__ import annotations

from abc import ABC, abstractmethod
import numpy as np


class SpeakerIdentifier(ABC):
    """Interface for future speaker-recognition implementations."""

    @abstractmethod
    def identify(self, audio: np.ndarray) -> str | None:
        raise NotImplementedError


class NoOpSpeakerIdentifier(SpeakerIdentifier):
    """Default implementation: no speaker identification."""

    def identify(self, audio: np.ndarray) -> str | None:
        return None
