
# WhisperVerse - Audio Transcription App

A full-stack application for transcribing audio files using OpenAI's Whisper model.

## Setup and Installation

### Frontend (React)

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

The frontend will be available at http://localhost:8080 (or another port specified by your dev server).

### Backend (Python Flask)

1. Navigate to the backend directory:
```
cd backend
```

2. Create a virtual environment (recommended):
```
python -m venv venv
```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Start the Flask server:
```
python app.py
```

The backend will be available at http://localhost:5000.

## Usage

1. Open the frontend application in your browser
2. Upload an audio file (MP3, WAV, etc.)
3. Wait for the transcription to complete
4. View, copy, or download the transcription result

## Note

Make sure both the frontend and backend servers are running simultaneously for the application to work properly.
