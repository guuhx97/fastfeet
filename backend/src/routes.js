import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authConfig from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authConfig);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

export default routes;
