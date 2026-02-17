import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ejs from "ejs";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * GET /api/reports/mission-letter
 *
 * Renders a Mission Letter (លិខិតបញ្ជាបេសកកម្ម) as an A4 PDF.
 * Margins are configured to leave blank space for pre-printed letterhead.
 */
export const getMissionLetter = asyncHandler(
    async (_req: Request, res: Response) => {

        // ── 1. Cleaned Dynamic Data ──
        // This exactly matches the spelling, names, and purpose from your physical document
        const data = {
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
            missionPurpose: "ខ្លឹមសារចុះអង្កេតករណីគ្រោះថ្នាក់ចរាចរណ៍លើជនរងគ្រោះឈ្មោះ ហឿន ហៃ (ស្លាប់) និងឈ្មោះ វ៉ង់ ដាណាត់ (ធ្ងន់) ដែលបម្រើការងារនៅសហគ្រាស ខេម ហ្គាមេន ខូអិលធីឌី និងចុះអង្កេតផ្ទាល់ដល់កន្លែងធ្វើការ និងទីតាំងកើតហេតុ ដែលមានទីតាំងស្ថិតនៅខេត្តកណ្តាល។",
            khmerLunarDate: "ថ្ងៃសុក្រ ១ កើត ខែ មិគសិរ ឆ្នាំម្សាញ់ ឆស័ក ព.ស.២៥៦៩",
            signDate: "២១ ខែ វិច្ឆិកា ឆ្នាំ២០២៥",
            signatoryName: "ម៉េង ហុង"
        };

        // ── 2. Render EJS → HTML string ──
        const templatePath = path.join(
            __dirname,
            "templates",
            "mission_letter.ejs"
        );
        const html = await ejs.renderFile(templatePath, data);

        // ── 3. Puppeteer → PDF buffer ──
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium-browser",
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu"
            ],
            ignoreDefaultArgs: ["--disable-extensions"],
        });

        try {
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: "networkidle0" });

            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: "140px",
                    bottom: "100px",
                    left: "60px",
                    right: "60px",
                },
            });

            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=mission_letter.pdf",
                "Content-Length": pdfBuffer.length.toString(),
            });

            res.end(pdfBuffer);
        } finally {
            await browser.close();
        }
    }
);