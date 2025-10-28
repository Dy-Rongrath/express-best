import { Router } from 'express';
import { create, list, get, update, remove } from './user.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { createUserSchema, updateUserSchema } from './user.schema.js';
import { asyncHandler } from '../../common/http.js';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users
 *   post:
 *     summary: Create user
 */
router.get('/', asyncHandler(list));
router.post('/', validate(createUserSchema), asyncHandler(create));

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
router.get('/:id', asyncHandler(get));
router.patch('/:id', validate(updateUserSchema), asyncHandler(update));
router.delete('/:id', asyncHandler(remove));

export default router;
