import { db } from '../application/database';

// Database document schema
export type Prediction = {
  id: string;
  result: string;
  suggestion: string;
  createdAt: string;
};

// Response schema
export type PredictionResponse = {
  id: string;
  result: string;
  suggestion: string;
  createdAt: string;
};

export type PredictionHistoryResponse = {
  id: string;
  history: {
    result: string;
    createdAt: string;
    suggestion: string;
    id: string;
  };
};

// Response function
export function toPredictionResponse(
  prediction: Prediction
): PredictionResponse {
  return {
    id: prediction.id,
    result: prediction.result,
    suggestion: prediction.suggestion,
    createdAt: prediction.createdAt,
  };
}

export function toPredictionHistoryResponse(
  prediction: Prediction
): PredictionHistoryResponse {
  return {
    id: prediction.id,
    history: {
      result: prediction.result,
      createdAt: prediction.createdAt,
      suggestion: prediction.suggestion,
      id: prediction.id,
    },
  };
}

export const predictionsRef = db.collection('predictions');
