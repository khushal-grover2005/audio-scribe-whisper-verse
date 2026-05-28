export interface TranscriptionResult {
  text: string;
  duration: number;
}

export const transcribeAudio = async (file: File): Promise<TranscriptionResult> => {
  const startTime = Date.now();
  
  // Vite looks for the VITE_ prefix to allow frontend access to this key
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
  
  if (!apiKey) {
    throw new Error("Deepgram API key is missing. Please ensure VITE_DEEPGRAM_API_KEY is set in Vercel.");
  }
  
  try {
    // DIRECT TO DEEPGRAM PIPELINE
    // Bypasses the Vercel 4.5MB limit by uploading straight from the browser
    const response = await fetch(
      'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          // Send the raw audio type, defaulting to wav if unknown
          'Content-Type': file.type || 'audio/wav', 
        },
        body: file, // Send the raw file binary directly
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(`Deepgram Error: ${errorData?.err_msg || response.statusText}`);
    }
    
    const data = await response.json();
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    // Navigate Deepgram's JSON response structure to find the text
    const transcript = data.results?.channels[0]?.alternatives[0]?.transcript || "";
    
    return {
      text: transcript,
      duration: duration,
    };
  } catch (error) {
    console.error('Error during direct transcription:', error);
    throw error;
  }
};
