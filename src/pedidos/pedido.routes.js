import express from 'express';

import * as pedidoMiddleware from './pedido.middleware.js';
import * as pedidoController from './pedido.controller.js';

const router = express.Router();

router.get('/', pedidoController.findAll);
router.get('/devolucion', pedidoController.findAllDevolucion);

router.post('/', pedidoController.create);
router.post('/devolucion', pedidoController.createDevolucion);

router
  .route('/:id')
  .get(pedidoMiddleware.validExistPedidoIncluide, pedidoController.findOne)
  .patch(pedidoMiddleware.validExistPedido, pedidoController.update)
  .delete(pedidoMiddleware.validExistPedido, pedidoController.deleteElement);

const pedidoRouter = router;

export { pedidoRouter };
