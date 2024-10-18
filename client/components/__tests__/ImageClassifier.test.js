import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageClassifier from '../ImageClassifier';

describe('ImageClassifier', () => {
  it('renders without crashing', () => {
    render(<ImageClassifier />);
    expect(screen.getByText('Image Classifier')).toBeInTheDocument();
  });

  it('displays initial prediction if provided', () => {
    const initialPrediction = { className: 'dog', probability: 0.8 };
    render(<ImageClassifier initialPrediction={initialPrediction} />);
    expect(screen.getByText('Class: dog')).toBeInTheDocument();
    expect(screen.getByText('Probability: 80.00%')).toBeInTheDocument();
  });
});
