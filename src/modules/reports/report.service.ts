import carbone from "carbone";
import { access } from "node:fs/promises";
import { getReportTemplate, type ReportTemplateKey } from "./report.catalog.js";
import { HttpError } from "../../middlewares/error.js";

type MissionMember = {
  name: string;
  position: string;
  role: string;
};

type MissionLetterData = {
  missionLocation: string;
  members: MissionMember[];
  departureDate: string;
  returnDate: string;
  transport: string;
  missionPurpose: string;
  khmerLunarDate: string;
  signDate: string;
  signatoryName: string;
};

export function buildMissionLetterData(): MissionLetterData {
  return {
    missionLocation: "ខេត្តកណ្តាល",
    members: [
      {
        name: "ធីង គីរី",
        position: "អនុប្រធានការិយាល័យអធិការកិច្ចទី៣",
        role: "ប្រធានក្រុម",
      },
      {
        name: "យ៉ន យ៉ាត់",
        position: "បុគ្គលិកអធិការកិច្ចសន្តិសុខសង្គម",
        role: "សមាជិក",
      },
      {
        name: "លឹម សាម៉ាក់",
        position: "អ្នកបើកបរ",
        role: "សមាជិក",
      },
    ],
    departureDate: "២១ ខែ វិច្ឆិកា ឆ្នាំ ២០២៥",
    returnDate: "២១ ខែ វិច្ឆិកា ឆ្នាំ ២០២៥",
    transport: "រថយន្តប.ស.ស.",
    missionPurpose:
      "ខ្លឹមសារចុះអង្កេតករណីគ្រោះថ្នាក់ចរាចរណ៍លើជនរងគ្រោះឈ្មោះ ហឿន ហៃ (ស្លាប់) និងឈ្មោះ វ៉ង់ ដាណាត់ (ធ្ងន់) ដែលបម្រើការងារនៅសហគ្រាស ខេម ហ្គាមេន ខូអិលធីឌី និងចុះអង្កេតផ្ទាល់ដល់កន្លែងធ្វើការ និងទីតាំងកើតហេតុ ដែលមានទីតាំងស្ថិតនៅខេត្តកណ្តាល។",
    khmerLunarDate: "ថ្ងៃសុក្រ ១ កើត ខែ មិគសិរ ឆ្នាំម្សាញ់ ឆស័ក ព.ស.២៥៦៩",
    signDate: "២១ ខែ វិច្ឆិកា ឆ្នាំ២០២៥",
    signatoryName: "ម៉េង ហុង",
  };
}

export async function renderCarboneReport(
  key: ReportTemplateKey,
  data: object,
): Promise<Buffer> {
  const template = getReportTemplate(key);

  if (template.engine !== "carbone") {
    throw new Error(`Report template "${key}" is not configured for Carbone rendering`);
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
