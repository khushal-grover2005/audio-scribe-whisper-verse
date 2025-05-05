
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import whisper
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the Whisper model once at startup
model = whisper.load_model("base")

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
        # Transcribe the audio using Whisper
        start_time = time.time()
        result = model.transcribe(temp_path)
        
        # Return the transcription result
        return jsonify({
            "text": result["text"],
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
