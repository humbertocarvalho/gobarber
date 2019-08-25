import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import authMiddleware from './app/middlewares/auth';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas de Usuário
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

// Rotas de Sessão
routes.post('/sessions', SessionController.store);

// Rotas de Arquivo
routes.post(
  '/files',
  upload.single('file'),
  authMiddleware,
  FileController.store
);

// Rotas de Providers
routes.get('/providers', authMiddleware, ProviderController.index);

// Rotas de Agendamentos
routes.post('/appointments', authMiddleware, AppointmentController.store);

export default routes;
