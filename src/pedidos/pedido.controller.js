import { Op } from 'sequelize';
import { catchAsync } from '../../utils/catchAsync.js';
import { Contador } from '../contadores/Contador.model.js';
import { ListaPedido } from '../listaPedidos/listaPedido.model.js';
import { Material } from '../materiales/material.model.js';
import { User } from '../user/user.model.js';
import { Pedido } from './pedido.model.js';
import { Clac } from '../clac/clac.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { fecha, fecha_inicio, fecha_final } = req.query;

  let whereFilter = {};

  // Verifica si fecha está presente y añade la propiedad al objeto
  if (fecha) {
    whereFilter.fecha = fecha;
  }

  if (fecha_inicio && fecha_final) {
    whereFilter.fecha = {
      [Op.between]: [fecha_inicio, fecha_final],
    };
  }
  // Usa la sintaxis correcta para findAll
  const pedidos = await Pedido.findAll({
    where: whereFilter,
    include: [
      { model: User },
      { model: Contador },
      { model: Clac },
      {
        model: ListaPedido,
        include: [{ model: Material }],
      },
    ],

    order: [['id', 'DESC']],
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
  const { fecha, supervisor, operario_id, lista_materiales } = req.body;

  const lastVale = await Pedido.max('num_vale');
  const num_vale = lastVale ? lastVale + 1 : 1; // Si no hay, empieza desde 1

  const pedido = await Pedido.create({
    fecha,
    supervisor,
    operario_id,
    num_vale,
  });

  const materialesPromises = lista_materiales.map(async (material) => {
    return await ListaPedido.create({
      pedido_id: pedido.id,
      material_id: material.id_material,
      cantidad: material.cantidad,
    });
  });

  await Promise.all(materialesPromises); // Esperar a que se resuelvan todas las promesas

  res.status(201).json({
    status: 'success',
    message: 'El pedido ha sido creado exitosamente!',
    pedido,
    lista_materiales, // Incluir lista_materiales en la respuesta
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

  await pedido.update({ estado: 'anulado' });

  return res.status(200).json({
    status: 'success',
    message: `The pedido with id: ${pedido.id} has been deleted`,
  });
});
