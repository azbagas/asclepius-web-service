import 'dotenv/config';
import { logger } from './application/logging';
import { web } from './application/web';
import { loadModel } from './service/load-model';

require('dotenv').config();

const PORT = 8080;

(async () => {
  try {
    const model = await loadModel();
    web.locals.model = model;

    web.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
