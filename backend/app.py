from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import time
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the OpenAI client
# It will automatically look for the "OPENAI_API_KEY" environment variable
client = OpenAI()

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    
    # Save the uploaded file to a temporary location
    # Vercel allows writing to /tmp
    temp_dir = tempfile.gettempdir()
    _, temp_ext = os.path.splitext(audio_file.filename)
    temp_path = os.path.join(temp_dir, f"upload_{int(time.time())}{temp_ext}")
    
    audio_file.save(temp_path)
    
    try:
        start_time = time.time()
        
        # Open the saved file and send it to OpenAI Whisper API
        with open(temp_path, "rb") as f:
            transcription = client.audio.transcriptions.create(
                model="whisper-1", 
                file=f
            )
        
        # Return the transcription result
        return jsonify({
            "text": transcription.text,
            "processing_time": time.time() - start_time
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        # Clean up the temporary file immediately
        if os.path.exists(temp_path):
            os.remove(temp_path)


if __name__ == '__main__':
    app.run(debug=True)
