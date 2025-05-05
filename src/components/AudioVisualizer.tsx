
import React from "react";

interface AudioVisualizerProps {
  isAnimating: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isAnimating }) => {
  const bars = Array.from({ length: 30 }, (_, i) => i);
  
  const getRandomHeight = () => {
    return Math.floor(Math.random() * 40) + 10;
  };

  return (
    <div className="flex items-center justify-center h-16 my-8 gap-[2px]">
      {bars.map((_, index) => (
        <div
          key={index}
          className={`bg-whisper rounded-full w-1 transition-all duration-300 ${
            isAnimating ? "opacity-80" : "opacity-30"
          }`}
          style={{
            height: isAnimating ? `${getRandomHeight()}px` : "10px",
            animationDelay: `${index * 0.05}s`,
            animation: isAnimating
              ? `wave ${(index % 5) * 0.2 + 1}s ease-in-out infinite`
              : "none",
          }}
        ></div>
      ))}
    </div>
  );
};

export default AudioVisualizer;
