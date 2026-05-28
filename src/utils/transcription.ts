// This file connects to the Python backend using Whisper for audio transcription

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
    // DYNAMIC URL FIX: 
    // If deployed to Vercel (Production), use the relative route '/api/transcribe'
    // If running locally (Development), use 'http://localhost:5000/transcribe'
    const endpoint = import.meta.env.PROD 
      ? '/api/transcribe' 
      : 'http://localhost:5000/transcribe';

    const response = await fetch(endpoint, {
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
