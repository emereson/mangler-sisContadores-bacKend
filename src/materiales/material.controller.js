import { catchAsync } from '../../utils/catchAsync.js';
import { Material } from './material.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const materiales = await Material.findAll({
    order: [['ubicacion', 'ASC']], // Ordenar por 'ubicacion' en orden ascendente (ASC)
  });

  return res.status(200).json({
    status: 'Success',
    results: materiales.length,
    materiales,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { material } = req;

  return res.status(200).json({
    status: 'Success',
    material,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { codigo, descripcion, ubicacion } = req.body;

  const material = await Material.create({
    codigo,
    descripcion,
    ubicacion,
  });

  res.status(201).json({
    status: 'success',
    message: 'The proveedor has been created successfully!',
    material,
  });
});

export const update = catchAsync(async (req, res) => {
  const { material } = req;
  const { codigo, descripcion, ubicacion } = req.body;

  await material.update({
    codigo,
    descripcion,
    ubicacion,
  });

  return res.status(200).json({
    status: 'success',
    message: 'material information has been updated',
    material,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { material } = req;

  await material.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The material with id: ${material.id} has been deleted`,
  });
});
