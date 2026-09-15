# Voice Notes POC (local, Python)

POC d'assistant vocal de prise de notes automatiques, 100% local.

## Fonctionnalités

- Écoute continue du microphone en local.
- Segmentation de l'audio en petits blocs.
- Détection de voix (VAD) avec `webrtcvad`.
- Transcription locale en français avec `faster-whisper`.
- Extraction heuristique des phrases de type **tâche** / **note**.
- Persistance locale dans :
  - SQLite (`notes.db`)
  - JSONL (`notes.jsonl`)
- Affichage en direct des transcriptions et notes dans le terminal.
- Architecture extensible pour ajouter ensuite la reconnaissance du locuteur.

## Arborescence

```text
voice_notes_poc/
├── data/
├── main.py
├── pyproject.toml
├── requirements.txt
└── src/
    └── voice_notes/
        ├── __init__.py
        ├── config.py
        ├── models.py
        ├── pipeline.py
        ├── audio/
        │   ├── __init__.py
        │   ├── capture.py
        │   └── vad.py
        ├── notes/
        │   ├── __init__.py
        │   └── extractor.py
        ├── speaker/
        │   ├── __init__.py
        │   └── base.py
        ├── storage/
        │   ├── __init__.py
        │   └── repository.py
        ├── transcription/
        │   ├── __init__.py
        │   └── whisper_engine.py
        └── ui/
            ├── __init__.py
            └── console.py
```

## Prérequis

- Python 3.10+
- Un microphone fonctionnel
- OS avec backend audio compatible `sounddevice` (PortAudio)

> Note Linux : installer PortAudio si nécessaire (`sudo apt install portaudio19-dev`).

## Installation

Depuis `voice_notes_poc/`:

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -e .
```

Alternative:

```bash
pip install -r requirements.txt
```

## Lancement

```bash
python main.py --model-size small --compute-type int8 --output-dir data
```

Options utiles :

- `--model-size` : `tiny`, `base`, `small`, `medium`, ...
- `--compute-type` : `int8`, `float16`, `float32`
- `--device` : index du micro (si plusieurs périphériques)
- `--output-dir` : dossier de sortie pour les fichiers persistés

Arrêt : `Ctrl+C`

## Résultats persistés

- SQLite : `data/notes.db`
  - Table `transcripts`
  - Table `notes`
- JSONL : `data/notes.jsonl` (une note par ligne)

## Comment fonctionne le pipeline

1. Capture audio continue du microphone (`audio/capture.py`).
2. VAD frame par frame (`audio/vad.py`) pour détecter les zones parlées.
3. Segments complets envoyés à `faster-whisper` (`transcription/whisper_engine.py`).
4. Détection heuristique de tâches/notes (`notes/extractor.py`).
5. Sauvegarde SQLite + JSONL (`storage/repository.py`).
6. Affichage terminal (`ui/console.py`).

## Extension future : reconnaissance du porteur

Le dossier `speaker/` contient une interface `SpeakerIdentifier` et une implémentation `NoOpSpeakerIdentifier`.

Pour brancher une reconnaissance locuteur plus tard :

- implémenter `identify(audio: np.ndarray) -> str | None`
- injecter l'implémentation dans `VoiceNotesApp`
- stocker l'identifiant (`speaker_id`) déjà prévu dans les modèles et la base

## Limites connues du POC

- Extraction de tâches/notes basée sur des règles simples (pas un modèle NLP avancé).
- Pas d'interface graphique (UI terminal uniquement).
- Dépend du bruit ambiant et de la qualité micro.

## Idées d'amélioration

- Filtrage du bruit / normalisation audio.
- Classification NLP plus robuste (intention task/note).
- Tableau de bord web local.
- Détection multi-locuteurs plus fine.
