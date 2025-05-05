
# WhisperVerse - Audio Processing App

A full-stack application for processing audio files.

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

2. Install the required packages globally (no virtual environment):
```
pip install flask flask-cors pydub
```

3. Start the Flask server:
```
python app.py
```

The backend will be available at http://localhost:5000.

## Usage

1. Open the frontend application in your browser
2. Upload an audio file (MP3, WAV, etc.)
3. Wait for the processing to complete
4. View the results

## Note

Make sure both the frontend and backend servers are running simultaneously for the application to work properly.
