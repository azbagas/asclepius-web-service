import {
  Prediction,
  PredictionHistoryResponse,
  PredictionResponse,
  predictionsRef,
  toPredictionHistoryResponse,
  toPredictionResponse,
} from '../models/prediction.model';
import { ResponseError } from '../error/response-error';
import crypto from 'crypto';
import * as tf from '@tensorflow/tfjs-node';
import { web } from '../application/web';

export class PredictionService {
  static async predict(
    fileRequest: Express.Multer.File
  ): Promise<PredictionResponse> {
    // Validate image
    if (!fileRequest) {
      throw new ResponseError(400, 'fail', 'Image is required.');
    }

    // Check image size (max 1MB)
    if (fileRequest.size > 1 * 1000 * 1000) {
      throw new ResponseError(413, 'fail', 'Payload content length greater than maximum allowed: 1000000');
    }

    let probabilities;
    try {
      // Predict
      const tensor = tf.node
        .decodeJpeg(fileRequest.buffer)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();
  
      const model = web.locals.model as tf.GraphModel;
      const prediction = model.predict(tensor) as tf.Tensor;
  
      // Get predition result as array
      probabilities = prediction.dataSync();
    } catch (error) {
      throw new ResponseError(400, 'fail', 'Terjadi kesalahan dalam melakukan prediksi');
    }

    // Classify based on threshold 50%
    const label = probabilities[0] > 0.5 ? 'Cancer' : 'Non-cancer';

    // Suggestion
    const suggestion =
      label === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';

    // Store in database
    const newId = crypto.randomUUID();
    const newPrediction: Prediction = {
      id: newId,
      result: label,
      suggestion: suggestion,
      createdAt: new Date().toISOString(),
    };
    await predictionsRef.doc(newId).set(newPrediction);

    // Return the result
    return toPredictionResponse(newPrediction);
  }

  static async getHistories(): Promise<PredictionHistoryResponse[]> {
    const snapshot = await predictionsRef.get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => {
      return toPredictionHistoryResponse(doc.data() as Prediction);
    });
  }
}
