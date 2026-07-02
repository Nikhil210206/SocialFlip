"use client";

interface PriceSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

export default function PriceSlider({ value, onChange, min = 0, max = 100000 }: PriceSliderProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1] - 1);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0] + 1);
    onChange([value[0], newMax]);
  };

  const minPercent = ((value[0] - min) / (max - min)) * 100;
  const maxPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      {/* Dual Range Slider */}
      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
        {/* Active Track */}
        <div
          className="absolute h-1.5 bg-purple-500 rounded-full"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={value[0]}
          onChange={handleMinChange}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer range-slider"
          style={{ zIndex: value[0] > max - 100 ? 5 : 3 }}
        />
        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={value[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer range-slider"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500 font-medium">
        <span>${value[0].toLocaleString("en-US")}</span>
        <span>${value[1].toLocaleString("en-US")}</span>
      </div>

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 0 1px #7c3aed, 0 2px 4px rgba(124, 58, 237, 0.3);
          transition: box-shadow 0.2s;
        }
        .range-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 1px #7c3aed, 0 2px 8px rgba(124, 58, 237, 0.5);
        }
        .range-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 0 1px #7c3aed;
        }
      `}</style>
    </div>
  );
}
