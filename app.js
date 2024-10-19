import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';

import { AppError } from './utils/AppError.js';

import { globalErrorHandler } from './utils/errors.js';
import { usersRouter } from './src/user/user.routes.js';
import { materialRouter } from './src/materiales/material.routes.js';
import { pedidoRouter } from './src/pedidos/pedido.routes.js';
import { contadorRouter } from './src/contadores/contador.routes.js';

const app = express();

app.set('trust proxy', 1);
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(hpp());
app.use('/api/v1', limiter);
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/material', materialRouter);
app.use('/api/v1/pedido', pedidoRouter);
app.use('/api/v1/contador', contadorRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404)
  );
});

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
});

app.use(globalErrorHandler);

export { app };
