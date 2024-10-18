import React, { useState } from 'react';

const positiveWords = new Set(['good', 'great', 'excellent', 'happy', 'positive', 'wonderful', 'fantastic', 'amazing']);
const negativeWords = new Set(['bad', 'terrible', 'awful', 'sad', 'negative', 'horrible', 'disappointing', 'poor']);

const analyzeSentiment = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.has(word)) score++;
    if (negativeWords.has(word)) score--;
  });
  
  if (score > 0) return 'Positive';
  if (score < 0) return 'Negative';
  return 'Neutral';
};

const SimpleSentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const handleAnalysis = () => {
    const result = analyzeSentiment(text);
    setSentiment(result);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Simple Sentiment Analysis</h2>
      <textarea
        className="w-full p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis"
      />
      <button
        onClick={handleAnalysis}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Analyze Sentiment
      </button>
      {sentiment && (
        <p className="mt-4">Sentiment: <strong>{sentiment}</strong></p>
      )}
    </div>
  );
};

export default SimpleSentimentAnalysis;
