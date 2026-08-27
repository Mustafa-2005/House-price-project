import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ResultPageProps {
  predictedPrice: number | null;
}

export const ResultPage: React.FC<ResultPageProps> = ({ predictedPrice }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number): string => {
    if (price >= 1e7) {
      return `₹ ${(price / 1e7).toFixed(2)} Cr`;
    }
    return `₹ ${(price / 1e5).toFixed(2)} Lac`;
  };

  return (
    <div className="container result-page">
      <h2>Valuation Estimate</h2>
      {predictedPrice !== null ? (
        <div className="price-display">
          <p>Estimated Market Price:</p>
          <h1 className="price-value">{formatPrice(predictedPrice)}</h1>
        </div>
      ) : (
        <p>No valuation metrics present. Run an estimation first.</p>
      )}
      <button onClick={() => navigate('/')} className="back-btn">
        Evaluate Another Property
      </button>
    </div>
  );
};