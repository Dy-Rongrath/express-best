import carbone from "carbone";
import { access } from "node:fs/promises";
import { getReportTemplate, type ReportTemplateKey } from "./report.catalog.js";
import { HttpError } from "../../middlewares/error.js";

// ---------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------

type MissionStaff = {
  no: string;
  name: string;
  position: string;
  role: string;
};

type EnterpriseCell = {
  no: string;
  name: string;
};

type EnterpriseRow = {
  left: EnterpriseCell;
  right: EnterpriseCell;
};

type Receiver = {
  name: string;
};

type MissionLetterData = {
  code: string;
  staffs_count: string;
  mission_location: string;
  full_departure_date: string;
  transportation: string;
  mission_purpose: string;
  full_khmer_sign_date: string;
  full_sign_date: string;
  staffs: MissionStaff[];
  enterprise_rows: EnterpriseRow[];
  receivers: Receiver[];
};

// ---------------------------------------------------------------------------
// Sample / builder
// ---------------------------------------------------------------------------

export function buildMissionLetterData(): MissionLetterData {
  return {
    code: "០០១/២៦",
    staffs_count: "២",
    mission_location: "ខេត្តកំពង់ស្ពឺ",
    full_departure_date: "ថ្ងៃទី២៥ ខែមីនា ឆ្នាំ២០២៦",
    transportation: "រថយន្ត",
    mission_purpose:
      "ចុះបំពេញបេសកកម្មត្រួតពិនិត្យ និងប្រមូលព័ត៌មានពាក់ព័ន្ធនឹងសហគ្រាស",
    full_khmer_sign_date: "ថ្ងៃពុធ ៧កើត ខែចេត្រ ឆ្នាំរោង ឆស័ក ព.ស.២៥៦៩",
    full_sign_date: "ថ្ងៃទី២៥ ខែមីនា ឆ្នាំ២០២៦",
    staffs: [
      { no: "១", name: "ម៉េង ហុង", position: "ប្រធានការិយាល័យ", role: "ប្រធានក្រុម" },
      { no: "២", name: "សុខ ដារ៉ា", position: "មន្ត្រី", role: "សមាជិក" },
    ],
    enterprise_rows: [
      {
        left:  { no: "១", name: "គ្រឹះស្ថាន អេប៊ីស៊ី" },
        right: { no: "២", name: "សហគ្រាស តារា" },
      },
      {
        left:  { no: "៣", name: "ក្រុមហ៊ុន សុខា" },
        right: { no: "៤", name: "ក្រុមហ៊ុន ដារ៉ា" },
      },
    ],
    receivers: [
      { name: "ឯកឧត្តម អគ្គនាយក ដើម្បីជ្រាប" },
      { name: "ឯកសារកាលប្បវត្តិ" },
    ],
  };
}

// ---------------------------------------------------------------------------
// Renderer
// ---------------------------------------------------------------------------

export async function renderCarboneReport(
  key: ReportTemplateKey,
  data: object,
): Promise<Buffer> {
  const template = getReportTemplate(key);

  if (template.engine !== "carbone") {
    throw new Error(
      `Report template "${key}" is not configured for Carbone rendering`,
    );
  }

  try {
    await access(template.templatePath);
  } catch {
    throw new HttpError(
      500,
      `Missing report template file for "${key}". Expected: ${template.templatePath}`,
    );
  }

  return new Promise((resolve, reject) => {
    carbone.render(
      template.templatePath,
      data,
      { convertTo: "pdf" },
      (err: Error | null, result: Buffer) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      },
    );
  });
}
