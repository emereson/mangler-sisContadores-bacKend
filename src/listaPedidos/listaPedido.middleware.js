import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Pedido } from './listaPedido.model.js';

export const validExistPedido = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const pedido = await Pedido.findOne({
    where: {
      id,
    },
  });

  if (!pedido) {
    return next(new AppError(`itineario with id: ${id} not found `, 404));
  }

  req.pedido = pedido;
  next();
});
