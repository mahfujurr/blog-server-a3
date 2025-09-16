import express from 'express';
import { entityController } from './entity.controller';


const router = express.Router();

router.post(
    '/',
    entityController.createEntity
);

router.get('/', entityController.getAllEntities);
router.get('/:id', entityController.getSingleEntity);

router.patch(
    '/:id',
    entityController.updateEntity
);

router.delete(
    '/:id',
    entityController.deleteEntity
);

export const EntityRoutes = router;
