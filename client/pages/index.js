import React from 'react';
import ImageClassifier from '../components/ImageClassifier';
import SimpleSentimentAnalysis from '../components/SimpleSentimentAnalysis';
import * as tf from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';

const Home = ({ initialPrediction }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Welcome to My ML-Powered Portfolio</h1>
      <p className="mb-8">This site showcases my skills in web development and machine learning.</p>
      <ImageClassifier initialPrediction={initialPrediction} />
      <SimpleSentimentAnalysis />
    </div>
  );
};

export async function getServerSideProps() {
  const model = await mobilenet.load();
  const image = await tf.node.decodeImage(await fetch('https://example.com/sample-image.jpg').then(res => res.arrayBuffer()));
  const predictions = await model.classify(image);
  
  return {
    props: {
      initialPrediction: predictions[0],
    },
  };
}

export default Home;