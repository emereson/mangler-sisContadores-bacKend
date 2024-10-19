import { DataTypes } from 'sequelize';
import { db } from '../db/db.config.js';

const Pedido = db.define('pedidos', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  operario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  supervisor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actividad: {
    type: DataTypes.STRING,
    defaultValue: 'MEDIDORES',
    allowNull: false,
  },
  num_vale: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'despachado', 'anulado'),
    allowNull: false,
    defaultValue: 'pendiente',
  },
});

export { Pedido };
