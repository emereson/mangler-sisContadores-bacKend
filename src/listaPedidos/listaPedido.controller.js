import { catchAsync } from '../../utils/catchAsync.js';
import { Proveedor } from '../proveedor/proveedor.model.js';
import { Pedido } from './listaPedido.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const pedidos = await Pedido.findAll({
    where: { status: 'active' },
  });

  return res.status(200).json({
    status: 'Success',
    results: pedidos.length,
    pedidos,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { pedido } = req;

  return res.status(200).json({
    status: 'Success',
    pedido,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { id_material, id_operario, fecha } = req.body;

  const pedido = await Pedido.create({
    fecha,
    num_pedido,
    actividad,
    codigo,
    operario,
    num_vale,
  });

  res.status(201).json({
    status: 'success',
    message: 'The proveedor has been created successfully!',
    pedido,
  });
});

export const update = catchAsync(async (req, res) => {
  const { pedido } = req;
  const { fecha, num_pedido, actividad, codigo, operario, num_vale } = req.body;

  await pedido.update({
    fecha,
    num_pedido,
    actividad,
    codigo,
    operario,
    num_vale,
  });

  return res.status(200).json({
    status: 'success',
    message: 'pedido information has been updated',
    pedido,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { pedido } = req;

  await pedido.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The pedido with id: ${pedido.id} has been deleted`,
  });
});
