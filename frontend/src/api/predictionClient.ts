import { PredictionRequest, PredictionResponse } from '../types/prediction';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function predictPrice(data: PredictionRequest): Promise<PredictionResponse> {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('API server failed to process prediction request');
  }

  return response.json();
}