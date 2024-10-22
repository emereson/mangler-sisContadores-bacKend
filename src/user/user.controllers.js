import bcrypt from 'bcryptjs';
import { User } from './user.model.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { AppError } from '../../utils/AppError.js';
import { generateJWT } from '../../utils/jwt.js';
import { Op } from 'sequelize';

export const findAll = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  const users = await User.findAll({
    where: {
      status: 'active',
      [Op.or]: [
        { nombre: { [Op.like]: `%${search}%` } },
        { codigo: { [Op.like]: `%${search}%` } },
      ],
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: users.length,
    users,
  });
});

export const findAllOperarios = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      role: 'Brigada',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: users.length,
    users,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    user,
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const { codigo, nombre, apellidos, dni, celular, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    codigo,
    nombre,
    apellidos,
    dni,
    celular,
    role,
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'the user has been created successfully!',
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      dni: user.dni,
      role: user.role,
      celular: user.celular,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { codigo, password } = req.body;

  const user = await User.findOne({
    where: {
      codigo,
      status: 'active',
    },
  });
  if (!user) {
    return next(new AppError('El usuario no se encuentra registrado', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Contraseña incorrecta', 401));
  }

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      dni: user.dni,
      role: user.role,
      celular: user.celular,
    },
  });
});

export const update = catchAsync(async (req, res) => {
  const { codigo, nombre, apellidos, dni, celular, password, role, status } =
    req.body;
  const { user } = req;
  if (password.length > 3) {
    await user.update({
      codigo,
      nombre,
      apellidos,
      dni,
      celular,
      password,
      role,
      status,
    });
  } else {
    await user.update({
      codigo,
      nombre,
      apellidos,
      dni,
      celular,
      role,
      status,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'User information has been updated',
    user,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The user with id: ${user.id} has been deleted`,
  });
});
