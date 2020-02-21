import { Router } from 'express';

// middlewares
import auth from './app/middlewares/auth';
import upload from './app/middlewares/upload';

// controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryCollectController from './app/controllers/DeliveryCollectController';
import DeliveryDeliverController from './app/controllers/DeliveryDeliverController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

// instances
const routes = new Router();

// Routes that do not require authentication
routes.post('/session', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliverymanController.show);

routes.get(
  '/deliveryman/:deliveryman_id/collect',
  DeliveryCollectController.index
);
routes.put(
  '/deliveryman/:deliveryman_id/delivery/:delivery_id/collect',
  DeliveryCollectController.update
);

routes.get(
  '/deliveryman/:deliveryman_id/deliver',
  DeliveryDeliverController.index
);
routes.put(
  '/deliveryman/:deliveryman_id/delivery/:delivery_id/deliver',
  DeliveryDeliverController.update
);

routes.post('/delivery/:delivery_id/problems', DeliveryProblemController.store);

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

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:deliveryman_id', DeliverymanController.update);
routes.delete('/deliveryman/:deliveryman_id', DeliverymanController.delete);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:deliveryman_id', DeliverymanController.update);
routes.delete('/deliveryman/:deliveryman_id', DeliverymanController.delete);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:delivery_id', DeliveryController.update);
routes.delete('/delivery/:delivery_id', DeliveryController.delete);

routes.get('/delivery/:delivery_id/problems', DeliveryProblemController.show);
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.delete(
  '/problem/:problem_id/cancel-delivery',
  DeliveryProblemController.delete
);

export default routes;
