import { NextFunction, Request, Response } from 'express';
import { PredictionService } from '../service/prediction.service';

export class PredictionController {
  static async predict(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PredictionService.predict(req.file);

      res.status(201).json({
        status: 'success',
        message: 'Model is predicted successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getHistories(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PredictionService.getHistories();

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
