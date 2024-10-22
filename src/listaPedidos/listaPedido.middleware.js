import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { ListaPedido } from './listaPedido.model.js';

export const validExistListaPedido = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const listaPedido = await ListaPedido.findOne({
    where: {
      id,
    },
  });

  if (!listaPedido) {
    return next(new AppError(`listaPedido with id: ${id} not found `, 404));
  }

  req.listaPedido = listaPedido;
  next();
});
