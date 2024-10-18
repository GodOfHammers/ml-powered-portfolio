import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const ImageClassifier = ({ initialPrediction }) => {
  const [prediction, setPrediction] = useState(initialPrediction);
  const [model, setModel] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const classifyImage = async () => {
    if (model && imageRef.current) {
      const predictions = await model.classify(imageRef.current);
      setPrediction(predictions[0]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Image Classifier</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            imageRef.current.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }}
        className="mb-4"
      />
      <img ref={imageRef} className="max-w-full h-auto mb-4" />
      <button
        onClick={classifyImage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Classify Image
      </button>
      {prediction && (
        <div className="mt-4">
          <p>Class: {prediction.className}</p>
          <p>Probability: {(prediction.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageClassifier;