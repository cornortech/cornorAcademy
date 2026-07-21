import { Router, Request, Response } from "express";
import multer from "multer";
import { uploadBuffer } from "../libs/cloudinary";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No file provided" });
      }

      const folder = (req.body.folder as string) || "cornor-academy";
      const filename = `${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      const result = await uploadBuffer(req.file.buffer, folder, filename);

      res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error: any) {
      console.error("Upload error:", error?.message || error);
      res.status(500).json({ success: false, error: error?.message || "Upload failed" });
    }
  }
);

export default router;
