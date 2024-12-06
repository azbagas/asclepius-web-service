import express from 'express';
import multer from 'multer';
import { PredictionController } from '../controller/prediction.controller';

const apiRouter = express.Router();

// Multer configuration
const upload = multer({ 
  storage: multer.memoryStorage() 
});

// Prediction API
apiRouter.post('/predict', upload.single('image'), PredictionController.predict);
apiRouter.get('/predict/histories', PredictionController.getHistories);

export { apiRouter };

