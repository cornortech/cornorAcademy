import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let settings = await prisma.systemSettings.findFirst();
    if (!settings) {
      settings = await prisma.systemSettings.create({
        data: {},
      });
    }
    return res.json(settings);
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ success: false, error: "Unauthorized. Admin role required." });
    }

    const {
      platformName,
      supportEmail,
      supportPhone,
      facebookUrl,
      instagramUrl,
      allowRefunds,
      requireCertificate,
      autoArchive,
      currency,
      taxRate,
    } = req.body;

    const currentSettings = await prisma.systemSettings.findFirst();
    const settingsId = currentSettings?.id || "system-settings-id";

    const updatedSettings = await prisma.systemSettings.upsert({
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
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
