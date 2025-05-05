
import { Headphones } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 py-4 px-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-whisper p-2 rounded-lg">
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-bold text-2xl">
            <span className="gradient-text">Whisper</span>
            <span className="text-slate-700">Verse</span>
          </h1>
        </div>
        <div className="text-sm text-slate-500">
          Audio Transcription Made Simple
        </div>
      </div>
    </header>
  );
};

export default Header;
