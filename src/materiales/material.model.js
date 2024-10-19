import { DataTypes } from 'sequelize';
import { db } from '../db/db.config.js';

const Material = db.define('materiales', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  codigo: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.ENUM('Hidràulicos', 'Herramientas', 'Epis'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

export { Material };
