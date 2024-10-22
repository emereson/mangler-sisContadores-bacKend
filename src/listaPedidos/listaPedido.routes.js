import express from 'express';

import * as listaPedidoMiddleware from './listaPedido.middleware.js';
import * as listaPedidoController from './listaPedido.controller.js';

const router = express.Router();

router.get('/', listaPedidoController.findAll);
router.post('/', listaPedidoController.create);

router
  .route('/:id')
  .get(
    listaPedidoMiddleware.validExistListaPedido,
    listaPedidoController.findOne
  )
  .patch(
    listaPedidoMiddleware.validExistListaPedido,
    listaPedidoController.update
  )
  .delete(
    listaPedidoMiddleware.validExistListaPedido,
    listaPedidoController.deleteElement
  );

const listaPedidoRouter = router;

export { listaPedidoRouter };
