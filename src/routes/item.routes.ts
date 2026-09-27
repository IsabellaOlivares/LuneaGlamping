import { Router } from 'express';
import * as itemController from '../controllers/item.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

router.use(authMiddleware);

router.get('/', itemController.getAll);
router.get('/:id', itemController.getById);
router.post('/', itemController.create);
router.patch('/:id', itemController.update);
router.delete('/:id', itemController.remove);

export default router;