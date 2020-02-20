import { Router } from 'express';

// middlewares
import auth from './app/middlewares/auth';
import upload from './app/middlewares/upload';

// controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';

// instances
const routes = new Router();

// Routes that do not require authentication
routes.post('/session', SessionController.store);

// Routes that require authentication
routes.use(auth);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipient_id', RecipientController.update);
routes.delete('/recipients/:recipient_id', RecipientController.delete);

routes.post('/files', upload, FileController.store);

export default routes;
