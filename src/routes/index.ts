import { Router } from 'express';
import todoRouter from './todo.routes';
import { apiKeyAuth } from '../middleware/auth.middleware';

const router = Router();

router.use('/todos', apiKeyAuth, todoRouter);

export default router; 