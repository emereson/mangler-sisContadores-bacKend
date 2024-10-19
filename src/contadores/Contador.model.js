import { DataTypes } from 'sequelize';
import { db } from '../db/db.config.js';

const Contador = db.define('contadores', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_contador: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export { Contador };
