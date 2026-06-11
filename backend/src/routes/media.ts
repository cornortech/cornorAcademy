import { Router, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/upload", authenticate, async (req: Request, res: Response) => {
  try {
    const { file, folder } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, error: "No file provided" });
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: folder || "cornor-academy",
      resource_type: "auto",
    });

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

export default router;
