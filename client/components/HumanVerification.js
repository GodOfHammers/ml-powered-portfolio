import { useState, useEffect, useRef } from 'react';

const HumanVerification = ({ onVerified }) => {
  const [step, setStep] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [showError, setShowError] = useState(false);
  const canvasRef = useRef(null);

  const generateNewPattern = () => {
    return Array(4).fill(0).map(() => Math.floor(Math.random() * 9));
  };

  // Generate random pattern on component mount
  useEffect(() => {
    setPattern(generateNewPattern());
  }, []);

  // Draw on canvas whenever pattern or step changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#4fd1c5';
    ctx.lineWidth = 2;
    
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
    
    // Draw pattern in step 0
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

    // Draw user's pattern in step 1
    if (step === 1) {
      userPattern.forEach((pos, index) => {
        const x = (pos % 3) * width / 3 + width / 6;
        const y = Math.floor(pos / 3) * height / 3 + height / 6;
        
        ctx.fillStyle = `rgba(79, 209, 197, ${0.3 + index * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        if (index > 0) {
          const prevX = (userPattern[index - 1] % 3) * width / 3 + width / 6;
          const prevY = Math.floor(userPattern[index - 1] / 3) * height / 3 + height / 6;
          
          ctx.strokeStyle = `rgba(79, 209, 197, ${0.3 + index * 0.2})`;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });
    }
  }, [pattern, step, userPattern]);

  const handleCanvasClick = (e) => {
    if (step !== 1) return;
    setShowError(false);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const cellX = Math.floor(x / (canvas.width / 3));
    const cellY = Math.floor(y / (canvas.height / 3));
    const pos = cellY * 3 + cellX;
    
    if (userPattern.length < pattern.length) {
      setUserPattern(prev => [...prev, pos]);
    }
  };

  const handleRetry = () => {
    setShowError(false);
    setUserPattern([]);
    setPattern(generateNewPattern());
    setStep(0);
  };

  const verifyPattern = () => {
    const isCorrect = pattern.every((pos, index) => pos === userPattern[index]);
    if (isCorrect) {
      setStep(2);
    } else {
      setShowError(true);
      setTimeout(handleRetry, 1500); // Show error for 1.5 seconds before retrying
    }
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    if (parseInt(e.target.value) === 100) {
      setStep(3);
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
            onClick={() => {
              setStep(1);
              setUserPattern([]);
              setShowError(false);
            }}
          >
            Ready
          </button>
        </div>
      )
    },
    {
      title: "Reproduce the Pattern",
      description: showError ? "Incorrect pattern! Try a new one..." : "Click the cells in the same order as shown",
      content: (
        <div className="flex flex-col items-center space-y-4">
          <canvas 
            ref={canvasRef}
            width={300}
            height={300}
            className={`border-2 ${showError ? 'border-red-500' : 'border-teal-400'} rounded-lg cursor-pointer transition-colors duration-300`}
            onClick={handleCanvasClick}
          />
          {userPattern.length === pattern.length && !showError && (
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-colors"
              onClick={verifyPattern}
            >
              Verify
            </button>
          )}
          {showError && (
            <p className="text-red-500 animate-pulse">Pattern incorrect. Getting new pattern...</p>
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
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className={`text-2xl font-bold ${showError ? 'text-red-500' : 'text-teal-400'} mb-2 transition-colors duration-300`}>
          {steps[step].title}
        </h2>
        <p className="text-gray-400 mb-6">{steps[step].description}</p>
        {steps[step].content}
      </div>
    </div>
  );
};

export default HumanVerification;