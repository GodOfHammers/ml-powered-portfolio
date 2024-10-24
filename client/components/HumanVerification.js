// components/HumanVerification.js
import { useState, useEffect, useRef } from 'react';

const HumanVerification = ({ onVerified }) => {
  const [step, setStep] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [sliderValue, setSliderValue] = useState(50);
  const canvasRef = useRef(null);

  useEffect(() => {
    const newPattern = Array(4).fill(0).map(() => Math.floor(Math.random() * 9));
    setPattern(newPattern);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      ctx.clearRect(0, 0, width, height);
      
      ctx.strokeStyle = '#4fd1c5';
      ctx.lineWidth = 2;
      
      // Draw grid
      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * width / 3, 0);
        ctx.lineTo(i * width / 3, height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * height / 3);
        ctx.lineTo(width, i * height / 3);
        ctx.stroke();
      }
      
      if (step === 0) {
        pattern.forEach((pos, index) => {
          const x = (pos % 3) * width / 3 + width / 6;
          const y = Math.floor(pos / 3) * height / 3 + height / 6;
          
          ctx.fillStyle = `rgba(79, 209, 197, ${0.3 + index * 0.2})`;
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fill();
          
          if (index > 0) {
            const prevX = (pattern[index - 1] % 3) * width / 3 + width / 6;
            const prevY = Math.floor(pattern[index - 1] / 3) * height / 3 + height / 6;
            
            ctx.strokeStyle = `rgba(79, 209, 197, ${0.3 + index * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        });
      }
    }
  }, [pattern, step]);

  const handleCanvasClick = (e) => {
    if (step !== 1) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellX = Math.floor(x / (rect.width / 3));
    const cellY = Math.floor(y / (rect.height / 3));
    const pos = cellY * 3 + cellX;
    
    setUserPattern(prev => [...prev, pos]);
  };

  const verifyPattern = () => {
    return pattern.every((pos, index) => pos === userPattern[index]);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    if (e.target.value === '100') {
      setStep(prev => prev + 1);
    }
  };

  const steps = [
    {
      title: "Remember the Pattern",
      description: "Watch and remember this pattern",
      content: (
        <div className="flex flex-col items-center space-y-4">
          <canvas 
            ref={canvasRef}
            width={300}
            height={300}
            className="border-2 border-teal-400 rounded-lg"
          />
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-colors"
            onClick={() => setStep(1)}
          >
            Ready
          </button>
        </div>
      )
    },
    {
      title: "Reproduce the Pattern",
      description: "Click the cells in the same order as shown",
      content: (
        <div className="flex flex-col items-center space-y-4">
          <canvas 
            ref={canvasRef}
            width={300}
            height={300}
            className="border-2 border-teal-400 rounded-lg cursor-pointer"
            onClick={handleCanvasClick}
          />
          {userPattern.length === pattern.length && (
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-colors"
              onClick={() => verifyPattern() && setStep(2)}
            >
              Verify
            </button>
          )}
        </div>
      )
    },
    {
      title: "Smooth Movement Check",
      description: "Slide to complete",
      content: (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-64 accent-teal-500"
          />
        </div>
      )
    },
    {
      title: "Final Verification",
      description: "Click the verify button to complete",
      content: (
        <div className="flex flex-col items-center space-y-4">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-colors"
            onClick={onVerified}
          >
            Verify Humanity
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all">
        <h2 className="text-2xl font-bold text-teal-400 mb-2">{steps[step].title}</h2>
        <p className="text-gray-400 mb-6">{steps[step].description}</p>
        {steps[step].content}
      </div>
    </div>
  );
};

export default HumanVerification;