import React from 'react';
import { PredictionForm } from '../components/PredictionForm';
import { PredictionRequest } from '../types/prediction';

interface HomePageProps {
  onPredict: (data: PredictionRequest) => void;
  isLoading: boolean;
  apiError: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({ onPredict, isLoading, apiError }) => {
  return (
    <div className="container">
      <h2>Indian Real Estate Valuation</h2>
      <p>Estimate the baseline market value of residential properties using localized ML modeling pipelines.</p>
      {apiError && <div className="error-banner">Error: {apiError}</div>}
      <PredictionForm onSubmit={onPredict} isLoading={isLoading} />
    </div>
  );
};