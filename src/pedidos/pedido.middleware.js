import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { ListaPedido } from '../listaPedidos/listaPedido.model.js';
import { Material } from '../materiales/material.model.js';
import { Pedido } from './pedido.model.js';

export const validExistPedido = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const pedido = await Pedido.findOne({
    where: {
      id,
    },
  });

  if (!pedido) {
    return next(new AppError(`itineario with id: ${id} not found `, 404));
  }

  req.pedido = pedido;
  next();
});

export const validExistPedidoIncluide = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const pedido = await Pedido.findOne({
    where: {
      id,
    },
    include: [
      {
        model: ListaPedido,
        include: [{ model: Material }],
      },
    ],
  });

  if (!pedido) {
    return next(new AppError(`itineario with id: ${id} not found `, 404));
  }

  req.pedido = pedido;
  next();
});
