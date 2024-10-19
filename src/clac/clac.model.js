import { DataTypes } from 'sequelize';
import { db } from '../db/db.config.js';

const Clac = db.define('clacs', {
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
});

export { Clac };
