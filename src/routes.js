import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import authMiddleware from './app/middlewares/auth';
import providerMiddleware from './app/middlewares/provider';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

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
routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.post('/appointments', authMiddleware, AppointmentController.store);

// Rotas de Consulta de Agenda do Provider
routes.get(
  '/schedule',
  authMiddleware,
  providerMiddleware,
  ScheduleController.index
);

// Notificações do Usuário
routes.get(
  '/notifications',
  authMiddleware,
  providerMiddleware,
  NotificationController.index
);
routes.put('/notifications/:id', authMiddleware, NotificationController.update);

export default routes;
