import { Router, Request, Response } from "express";
import { cloudinary } from "../libs/cloudinary";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/upload", authenticate, async (req: Request, res: Response) => {
  try {
    const { file, folder } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, error: "No file provided" });
    }

    console.log("Upload attempt - file type:", typeof file, "length:", file?.length, "folder:", folder);
    console.log("Cloudinary config:", { cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY ? "set" : "missing" });

    const result = await cloudinary.uploader.upload(file, {
      folder: folder || "cornor-academy",
      resource_type: "auto",
    });

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error("Upload error:", error?.message || error);
    res.status(500).json({ success: false, error: error?.message || "Upload failed" });
  }
});

export default router;
