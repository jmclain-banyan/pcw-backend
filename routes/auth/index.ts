import express, { Router } from 'express';
import authControllers from '../../controllers/authControllers';

const router: Router = express.Router();

router.route('/register').post(authControllers.registerPost);

router.route('/login').post(authControllers.loginPost);

router.route('/update').put(authControllers.updatePut);

export default router;
