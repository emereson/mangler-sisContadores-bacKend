import { Clac } from '../clac/clac.model.js';
import { Contador } from '../contadores/Contador.model.js';
import { ListaPedido } from '../listaPedidos/listaPedido.model.js';
import { Material } from '../materiales/material.model.js';
import { Pedido } from '../pedidos/pedido.model.js';
import { User } from '../user/user.model.js';

const initModel = () => {
  User.hasMany(Pedido, { foreignKey: 'operario_id' });
  Pedido.belongsTo(User, { foreignKey: 'operario_id' });

  Pedido.hasMany(ListaPedido, { foreignKey: 'pedido_id' });
  ListaPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });

  Pedido.hasMany(Contador, { foreignKey: 'pedido_id' });
  Contador.belongsTo(Pedido, { foreignKey: 'pedido_id' });

  Pedido.hasMany(Clac, { foreignKey: 'pedido_id' });
  Clac.belongsTo(Pedido, { foreignKey: 'pedido_id' });

  Material.hasMany(ListaPedido, { foreignKey: 'material_id' });
  ListaPedido.belongsTo(Material, { foreignKey: 'material_id' });
};

export { initModel };
