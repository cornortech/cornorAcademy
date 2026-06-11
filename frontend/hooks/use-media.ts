import { storage } from "@/lib/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface UploadResult {
  progress: number;
  url?: string;
  isCompleted: boolean;
}

export const useUploadImage = () => {
  const uploadImage = async (file: File): Promise<UploadResult> => {
    if (!file) {
      return { progress: 0, isCompleted: true };
    }

    let progress = 0;

    try {
      const storageRef = ref(storage, `cornor-academy/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const url = await new Promise<string>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Upload timeout")), 15000);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            clearTimeout(timeout);
            reject(error);
          },
          async () => {
            clearTimeout(timeout);
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });

      return { progress: 100, url, isCompleted: true };
    } catch (err) {
      console.error("Image upload failed:", err);
      return { progress, isCompleted: true, url: "" };
    }
  };

  return { uploadImage };
};
