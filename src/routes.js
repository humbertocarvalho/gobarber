import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
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
import AvailableController from './app/controllers/AvailableController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateAppointmentStore from './app/validators/AppointmentStore';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIST_PORT,
});

const bruteForce = new Brute(bruteStore);

// Rotas de Usuário
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', authMiddleware, validateUserUpdate, UserController.update);

// Rotas de Sessão
routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

// Rotas de Arquivo
routes.post(
  '/files',
  upload.single('file'),
  authMiddleware,
  FileController.store
);

// Rotas de Providers
routes.get('/providers', authMiddleware, ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

// Rotas de Agendamentos
routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.post(
  '/appointments',
  authMiddleware,
  validateAppointmentStore,
  AppointmentController.store
);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentController.delete
);

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
