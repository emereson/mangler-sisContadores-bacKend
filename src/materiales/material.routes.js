import express from 'express';

import * as materialController from './material.controller.js';
import * as materialMiddleware from './material.middleware.js';

const router = express.Router();

router.get('/', materialController.findAll);
router.post('/', materialController.create);

router
  .route('/:id')
  .get(materialMiddleware.validExistMaterial, materialController.findOne)
  .patch(materialMiddleware.validExistMaterial, materialController.update)
  .delete(
    materialMiddleware.validExistMaterial,
    materialController.deleteElement
  );

const materialRouter = router;

export { materialRouter };
