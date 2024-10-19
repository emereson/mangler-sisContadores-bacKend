import { catchAsync } from '../../utils/catchAsync.js';
import { Pedido } from '../pedidos/pedido.model.js';
import { Contador } from './clac.model.js';

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
  const { pedido } = req;
  const { array_codes } = req.body;

  await Promise.all(
    array_codes.map(async (code) => {
      const promises = code.codigos.map(async (number_code) => {
        return await Contador.create({
          pedido_id: pedido.id,
          codigo: number_code,
          num_contador: code.contador,
        });
      });
      await Promise.all(promises);
    })
  );
  await pedido.update({ estado: 'despachado' });

  res.status(201).json({
    status: 'success',
    message: 'Los contadores se agregaron   exitosamente!',
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
