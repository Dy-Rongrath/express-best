import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http.js";
import { getReportTemplate, listReportTemplates } from "./report.catalog.js";
import { buildMissionLetterData, renderCarboneReport } from "./report.service.js";

export const getReportTemplates = asyncHandler(async (_req: Request, res: Response) => {
  const templates = listReportTemplates().map((template) => ({
    key: template.key,
    name: template.name,
    engine: template.engine,
    outputFileName: template.outputFileName,
  }));

  res.json({ data: templates });
});

/**
 * GET /api/reports/mission-letter
 *
 * Renders a Mission Letter (លិខិតបញ្ជាបេសកកម្ម) as an A4 PDF.
 * Margins are configured to leave blank space for pre-printed letterhead.
 */
export const getMissionLetter = asyncHandler(
  async (_req: Request, res: Response) => {
    const template = getReportTemplate("mission-letter");
    const pdfBuffer = await renderCarboneReport(template.key, buildMissionLetterData());

    res.set({
      "Content-Type": template.mimeType,
      "Content-Disposition": `attachment; filename=${template.outputFileName}`,
      "Content-Length": pdfBuffer.length.toString(),
    });

    res.end(pdfBuffer);
  },
);
