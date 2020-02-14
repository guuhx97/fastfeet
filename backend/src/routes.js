import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';

import authConfig from './app/middlewares/auth';
import WithdrawnController from './app/controllers/WithdrawnController';
import DeliveredController from './app/controllers/DeliveredController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/signature', upload.single('file'), FileController.store);

routes.get('/delivered/deliveryman/:id/deliveries', DeliveredController.index);
routes.put(
  '/delivered/deliveryman/:deliveryman_id/delivery/:delivery_id',
  DeliveredController.update
);

routes.get('withdrawn/deliveryman/:id/deliveries', WithdrawnController.index);
routes.put(
  '/withdrawn/deliveryman/:deliveryman_id/delivery/:delivery_id',
  WithdrawnController.update
);

routes.use(authConfig);

routes.get('/recipient', RecipientController.show);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
