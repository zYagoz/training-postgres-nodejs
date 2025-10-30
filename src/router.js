import { Router } from "express";
import productsController from "./controllers/products.js";
import { clientsController } from "./controllers/clients-controller.js";
import { middlewareId } from "./middleware/middlewareId.js";
import { validateEmailName } from "./middleware/middlewareClienteDate.js"
import { ordersController } from "./controllers/orders-controller.js";

export const router = Router();

router.get('/products', productsController.index);
router.get('/products/:id', middlewareId, productsController.show);
router.post('/products/',  productsController.create);
router.put('/products/:id', middlewareId, productsController.update);
router.delete('/products/:id', middlewareId, productsController.delete);

router.get('/products', clientsController.index);
router.get('/products/:id', middlewareId, clientsController.show);
router.post('/products', validateEmailName, clientsController.create);
router.put('/products/:id', middlewareId, clientsController.update);
router.delete('/products/:id', middlewareId, clientsController.delete);

router.get('/orders', ordersController.index);
router.post('/orders', ordersController.create);
router.get('/orders/:id', ordersController.show);
router.delete('/orders/:id', ordersController.delete);
