
// This file connects to the Python backend for audio processing

export interface TranscriptionResult {
  text: string;
  duration: number;
}

export const transcribeAudio = async (file: File): Promise<TranscriptionResult> => {
  const startTime = Date.now();
  
  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('audio', file);
  
  try {
    // Send the audio file to the backend
    const response = await fetch('http://localhost:5000/transcribe', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    return {
      text: data.text,
      duration: duration,
    };
  } catch (error) {
    console.error('Error during transcription:', error);
    throw error;
  }
};
