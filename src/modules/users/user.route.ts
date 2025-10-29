import { Router } from 'express';
import { create, list, get, update, remove } from './user.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { createUserSchema, updateUserSchema } from './user.schema.js';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users
 *   post:
 *     summary: Create user
 */
router.get('/', list);
router.post('/', validate(createUserSchema), create);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user
 *   patch:
 *     summary: Update user
 *   delete:
 *     summary: Delete user
 */
router.get('/:id', get);
router.patch('/:id', validate(updateUserSchema), update);
router.delete('/:id', remove);

export default router;
