
import React, { useState } from "react";
import Header from "@/components/Header";
import AudioUploader from "@/components/AudioUploader";
import TranscriptionResult from "@/components/TranscriptionResult";
import AudioVisualizer from "@/components/AudioVisualizer";
import EmptyState from "@/components/EmptyState";
import { transcribeAudio } from "@/utils/transcription";
import { toast } from "sonner";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(
    null
  );

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    
    try {
      toast.info("Starting transcription...");
      const result = await transcribeAudio(file);
      setTranscriptionResult(result.text);
      toast.success(`Transcription completed in ${result.duration.toFixed(1)}s`);
    } catch (error) {
      console.error("Transcription error:", error);
      toast.error("Error transcribing your audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setTranscriptionResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      <Header />
      
      <main className="container max-w-5xl mx-auto py-8 px-4">
        {!selectedFile && !transcriptionResult ? (
          <EmptyState />
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
              {isProcessing
                ? "Converting Speech to Text"
                : transcriptionResult
                ? "Transcription Complete"
                : "Upload Your Audio"}
            </h1>
            <p className="text-slate-500 text-center mb-8 max-w-2xl mx-auto">
              {isProcessing
                ? "Our AI is processing your audio. This might take a few moments depending on the file size."
                : transcriptionResult
                ? "Your audio has been successfully transcribed. You can now copy or download the text."
                : "Select an audio file to transcribe using our advanced AI model."}
            </p>
          </div>
        )}

        {isProcessing ? (
          <div className="text-center">
            <AudioVisualizer isAnimating={true} />
            <div className="inline-block rounded-full bg-whisper/10 px-4 py-2 text-whisper-dark animate-pulse-opacity">
              Processing "{selectedFile?.name}" - please wait
            </div>
          </div>
        ) : transcriptionResult ? (
          <TranscriptionResult
            text={transcriptionResult}
            filename={selectedFile?.name || "audio"}
            onReset={handleReset}
          />
        ) : (
          <AudioUploader onFileSelect={handleFileSelect} />
        )}
      </main>
      
      <footer className="mt-auto py-6 text-center text-sm text-slate-500 border-t border-slate-200">
        <div className="container mx-auto">
          <p>
            Powered by{" "}
            <span className="font-semibold text-whisper">WhisperVerse</span> &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
