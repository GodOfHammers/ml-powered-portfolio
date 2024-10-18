import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SimpleSentimentAnalysis from '../SimpleSentimentAnalysis';

describe('SimpleSentimentAnalysis', () => {
  it('renders without crashing', () => {
    render(<SimpleSentimentAnalysis />);
    expect(screen.getByText('Simple Sentiment Analysis')).toBeInTheDocument();
  });

  it('analyzes positive sentiment correctly', () => {
    render(<SimpleSentimentAnalysis />);
    const input = screen.getByPlaceholderText('Enter text for sentiment analysis');
    const button = screen.getByText('Analyze Sentiment');

    fireEvent.change(input, { target: { value: 'This is a good day' } });
    fireEvent.click(button);

    expect(screen.getByText('Sentiment: Positive')).toBeInTheDocument();
  });

  it('analyzes negative sentiment correctly', () => {
    render(<SimpleSentimentAnalysis />);
    const input = screen.getByPlaceholderText('Enter text for sentiment analysis');
    const button = screen.getByText('Analyze Sentiment');

    fireEvent.change(input, { target: { value: 'This is a bad day' } });
    fireEvent.click(button);

    expect(screen.getByText('Sentiment: Negative')).toBeInTheDocument();
  });
});