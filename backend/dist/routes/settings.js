"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../libs/db"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GET /settings - Retrieve system settings
router.get("/", async (req, res) => {
    try {
        let settings = await db_1.default.systemSettings.findFirst();
        if (!settings) {
            // Create default settings if they don't exist yet
            settings = await db_1.default.systemSettings.create({
                data: {},
            });
        }
        return res.json(settings);
    }
    catch (error) {
        console.error("Error retrieving settings:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});
// POST /settings - Update system settings (admin only)
router.post("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ success: false, error: "Unauthorized. Admin role required." });
        }
        const { platformName, supportEmail, supportPhone, facebookUrl, instagramUrl, allowRefunds, requireCertificate, autoArchive, currency, taxRate, } = req.body;
        const currentSettings = await db_1.default.systemSettings.findFirst();
        const settingsId = currentSettings?.id || "system-settings-id";
        const updatedSettings = await db_1.default.systemSettings.upsert({
            where: { id: settingsId },
            update: {
                platformName,
                supportEmail,
                supportPhone,
                facebookUrl,
                instagramUrl,
                allowRefunds: allowRefunds !== undefined ? Boolean(allowRefunds) : undefined,
                requireCertificate: requireCertificate !== undefined ? Boolean(requireCertificate) : undefined,
                autoArchive: autoArchive !== undefined ? Boolean(autoArchive) : undefined,
                currency,
                taxRate: taxRate !== undefined ? parseFloat(taxRate) : undefined,
            },
            create: {
                id: settingsId,
                platformName: platformName || "Cornor Academy",
                supportEmail: supportEmail || "info@cornor.academy",
                supportPhone: supportPhone || "+977 9801234567",
                facebookUrl: facebookUrl || "https://facebook.com/cornoracademy",
                instagramUrl: instagramUrl || "https://instagram.com/cornor.academy",
                allowRefunds: allowRefunds !== undefined ? Boolean(allowRefunds) : true,
                requireCertificate: requireCertificate !== undefined ? Boolean(requireCertificate) : true,
                autoArchive: autoArchive !== undefined ? Boolean(autoArchive) : false,
                currency: currency || "npr",
                taxRate: taxRate !== undefined ? parseFloat(taxRate) : 0,
            },
        });
        return res.json(updatedSettings);
    }
    catch (error) {
        console.error("Error updating settings:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.default = router;
