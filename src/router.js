import { Router } from "express";
import productsController from "./controllers/products.js";
import { clientsController } from "./controllers/clients-controller.js";

export const router = Router();

router.get('/products', productsController.index);
router.get('/products/:id', productsController.show);
router.post('/products/:id', productsController.save);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.delete);

router.get('./products', clientsController.index);
router.get('./products/:id', clientsController.show);
router.post('./products', clientsController.create);
router.put('./products/:id', clientsController.update);
router.delete('./products/:id', clientsController.delete);
