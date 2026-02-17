import { Router } from "express";
import { getMissionLetter } from "./report.controller.js";

const router = Router();

/**
 * @swagger
 * /reports/mission-letter:
 *   get:
 *     summary: Generate Mission Letter PDF (លិខិតបញ្ជាបេសកកម្ម)
 *     description: Renders a Khmer mission letter and returns an A4 PDF suitable for pre-printed letterhead.
 *     produces:
 *       - application/pdf
 *     responses:
 *       200:
 *         description: PDF document
 */
router.get("/mission-letter", getMissionLetter);

export default router;
