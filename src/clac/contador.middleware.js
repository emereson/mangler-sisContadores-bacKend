import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Contador } from './clac.model.js';

export const validExistContador = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const contador = await Contador.findOne({
    where: {
      id,
    },
  });

  if (!contador) {
    return next(new AppError(`itineario with id: ${id} not found `, 404));
  }

  req.contador = contador;
  next();
});
