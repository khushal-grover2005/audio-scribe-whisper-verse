
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, Check } from "lucide-react";
import { toast } from "sonner";

interface TranscriptionResultProps {
  text: string;
  filename: string;
  onReset: () => void;
}

const TranscriptionResult: React.FC<TranscriptionResultProps> = ({
  text,
  filename,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    
    element.href = URL.createObjectURL(file);
    element.download = `${filename.split(".")[0]}_transcription.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Transcription downloaded!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Transcription Result
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleCopyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="min-h-[200px] max-h-[500px] overflow-y-auto whitespace-pre-wrap text-slate-700 leading-relaxed">
          {text}
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800"
        >
          Transcribe another file
        </Button>
      </div>
    </div>
  );
};

export default TranscriptionResult;
