
import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // List of common audio file extensions
    const validAudioTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 
      'audio/m4a', 'audio/x-m4a', 'audio/aac'
    ];
    
    if (validAudioTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      toast.error("Please upload a valid audio file.");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center ${
          dragActive ? "border-whisper bg-whisper/5" : "border-slate-200"
        } transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept="audio/*"
          onChange={handleChange}
          className="hidden"
        />
        
        {selectedFile ? (
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-whisper/10 flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-whisper"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-700">{selectedFile.name}</p>
                <p className="text-sm text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="absolute top-0 right-0 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="mx-auto w-16 h-16 rounded-full bg-whisper/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-whisper" />
            </div>
            <p className="text-lg font-medium text-slate-800 mb-1">
              Drag & drop your audio file here
            </p>
            <p className="text-slate-500 mb-4">
              or <label htmlFor="file-upload" className="text-whisper font-medium cursor-pointer hover:underline">browse</label> to choose a file
            </p>
            <p className="text-xs text-slate-400">
              Supported formats: MP3, WAV, M4A, AAC, OGG (max 25MB)
            </p>
          </>
        )}
      </div>
      
      {selectedFile && (
        <div className="mt-4">
          <Button 
            onClick={handleSubmit} 
            className="w-full py-2 bg-whisper hover:bg-whisper-dark"
          >
            Transcribe Audio
          </Button>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
