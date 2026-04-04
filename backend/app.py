from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import time
from deepgram import DeepgramClient, PrerecordedOptions, FileSource

app = Flask(__name__)
CORS(app)

# Initialize Deepgram Client
# It automatically looks for the "DEEPGRAM_API_KEY" environment variable
dg_client = DeepgramClient()

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    
    # Save to /tmp for Vercel compatibility
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(temp_dir, f"{int(time.time())}_{audio_file.filename}")
    audio_file.save(temp_path)
    
    try:
        start_time = time.time()
        
        with open(temp_path, "rb") as file:
            buffer_data = file.read()

        payload: FileSource = {
            "buffer": buffer_data,
        }

        # Configure Deepgram options
        options = PrerecordedOptions(
            model="nova-3",
            smart_format=True,
        )

        # Call the Deepgram API
        response = dg_client.listen.rest.v("1").transcribe_file(payload, options)
        
        # Extract the transcript text
        transcript = response.results.channels[0].alternatives[0].transcript

        return jsonify({
            "text": transcript,
            "processing_time": time.time() - start_time
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == '__main__':
    app.run(debug=True)
