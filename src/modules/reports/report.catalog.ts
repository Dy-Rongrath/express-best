import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesRoot = path.join(__dirname, "templates");

export type ReportTemplateKey = "mission-letter";

export type ReportTemplateDefinition = {
  key: ReportTemplateKey;
  name: string;
  engine: "carbone";
  templatePath: string;
  outputFileName: string;
  mimeType: string;
};

export const reportTemplates: Record<ReportTemplateKey, ReportTemplateDefinition> = {
  "mission-letter": {
    key: "mission-letter",
    name: "Mission Letter",
    engine: "carbone",
    templatePath: path.join(
      templatesRoot,
      "mission-letter",
      "template.docx",
    ),
    outputFileName: "mission_letter.pdf",
    mimeType: "application/pdf",
  },
};

export function getReportTemplate(key: ReportTemplateKey): ReportTemplateDefinition {
  return reportTemplates[key];
}

export function listReportTemplates(): ReportTemplateDefinition[] {
  return Object.values(reportTemplates);
}
