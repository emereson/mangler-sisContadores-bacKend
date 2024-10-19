import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Material } from './material.model.js';

export const validExistMaterial = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const material = await Material.findOne({
    where: {
      id,
    },
  });

  if (!material) {
    return next(new AppError(`material with id: ${id} not found `, 404));
  }

  req.material = material;
  next();
});
