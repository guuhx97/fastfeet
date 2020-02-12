import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

import authConfig from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authConfig);

routes.get('/recipient', RecipientController.show);
routes.get('/deliveryman', DeliverymanController.index);

routes.post('/recipient', RecipientController.store);
routes.post('/deliveryman', DeliverymanController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.put('/recipient/:id', RecipientController.update);
routes.put('/deliveryman/:id', DeliverymanController.update);

routes.delete('/recipient/:id', RecipientController.delete);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

export default routes;
