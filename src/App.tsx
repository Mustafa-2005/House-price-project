import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ResultPage } from './pages/ResultPage';
import { predictPrice } from './api/predictionClient';
import { PredictionRequest } from './types/prediction';
// @ts-ignore
import './App.css';

function App() {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for state-safe SPA navigation

  const handlePrediction = async (data: PredictionRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await predictPrice(data);
      setPredictedPrice(response.predicted_price);
      navigate('/result'); // Transition page without losing local state
    } catch (err: any) {
      setError(err.message || 'An error occurred during estimation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <HomePage 
            onPredict={handlePrediction} 
            isLoading={isLoading} 
            apiError={error} 
          />
        } 
      />
      <Route 
        path="/result" 
        element={<ResultPage predictedPrice={predictedPrice} />} 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;