import { DataTypes } from 'sequelize';
import { db } from '../db/db.config.js';

const ListaPedido = db.define('lista_pedidos', {
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
  material_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  estado: {
    type: DataTypes.ENUM('pendiente', 'despachado'),
    allowNull: false,
    defaultValue: 'pendiente',
  },
});

export { ListaPedido };
