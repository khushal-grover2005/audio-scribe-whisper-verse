
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
from pydub import AudioSegment
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    
    # Save the uploaded file to a temporary location
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(temp_dir, audio_file.filename)
    audio_file.save(temp_path)
    
    try:
        # Instead of using Whisper, we'll just return basic audio info
        # since we're focusing on the file upload functionality
        start_time = time.time()
        
        # Get audio duration using pydub
        audio = AudioSegment.from_file(temp_path)
        duration_seconds = len(audio) / 1000.0
        
        # Return mock transcription with audio info
        return jsonify({
            "text": f"This is a simulated transcription. Your audio file '{audio_file.filename}' is {duration_seconds:.2f} seconds long.",
            "processing_time": time.time() - start_time
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == '__main__':
    app.run(debug=True)
