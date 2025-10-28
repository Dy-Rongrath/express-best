import type { Request, Response } from 'express';

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Liveness probe
 *     responses:
 *       200:
 *         description: OK
 */
export function health(_req: Request, res: Response) {
  res.json({ status: 'ok' });
}

/**
 * @swagger
 * /ready:
 *   get:
 *     summary: Readiness probe
 *     responses:
 *       200:
 *         description: Ready
 */
export function ready(_req: Request, res: Response) {
  // Optionally check DB or external deps here
  res.json({ ready: true });
}
