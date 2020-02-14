import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';

import authConfig from './app/middlewares/auth';
import WithdrawController from './app/controllers/WithdrawController';
import CheckoutController from './app/controllers/CheckoutController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/signature', upload.single('file'), FileController.store);

routes.get('/delivered/deliveryman/:id/checkout', CheckoutController.index);
routes.put(
  '/deliveryman/:deliveryman_id/delivery/:delivery_id/checkout',
  CheckoutController.update
);

routes.get('/deliveryman/:id/deliveries', WithdrawController.index);
routes.put(
  '/deliveryman/:deliveryman_id/delivery/:delivery_id',
  WithdrawController.update
);

routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.use(authConfig);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

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
