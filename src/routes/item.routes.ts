import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/item.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router:Router = Router();

// Público: cualquiera puede ver el catálogo de planes, con o sin cuenta
router.get('/', getAll);
router.get('/:id', getById);

// Autenticado: crear plan
router.post('/', authMiddleware, create);

// Autenticado: actualizar (el service verifica si es dueño o admin)
router.patch('/:id', authMiddleware, update);

// Solo admin: eliminar
router.delete('/:id', authMiddleware, requireRole('admin'), remove);

export default router;