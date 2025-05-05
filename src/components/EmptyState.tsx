
import { Upload } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto text-center p-6 mt-12">
      <div className="mb-8">
        <div className="h-24 w-24 bg-whisper/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="h-12 w-12 text-whisper" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-slate-800">
          Begin Your Transcription Journey
        </h2>
        <p className="text-slate-500">
          Upload your audio files to convert speech into text. Our AI-powered
          system handles multiple languages and accents with remarkable accuracy.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6">
        {[
          {
            title: "Upload Files",
            description: "Supports MP3, WAV, M4A, and more formats",
          },
          {
            title: "AI Processing",
            description: "Powered by OpenAI Whisper technology",
          },
          {
            title: "Fast Results",
            description: "Get accurate transcriptions in minutes",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
          >
            <h3 className="font-medium text-slate-800 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
