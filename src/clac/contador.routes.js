import express from 'express';

import * as contadorMiddleware from './contador.middleware.js';
import * as contadorController from './contador.controller.js';
import * as pedidoMiddleware from '../pedidos/pedido.middleware.js';

const router = express.Router();

router.get('/', contadorController.findAll);

router
  .route('/:id')
  .post(pedidoMiddleware.validExistPedido, contadorController.create)
  .get(contadorMiddleware.validExistContador, contadorController.findOne)
  .patch(contadorMiddleware.validExistContador, contadorController.update)
  .delete(
    contadorMiddleware.validExistContador,
    contadorController.deleteElement
  );

const contadorRouter = router;

export { contadorRouter };
