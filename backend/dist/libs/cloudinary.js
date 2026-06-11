"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBuffer = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadBuffer = (buffer, folder, filename) => new Promise((resolve, reject) => {
    const upload = cloudinary_1.v2.uploader.upload_stream({ folder, public_id: filename }, (error, result) => (error ? reject(error) : resolve(result)));
    upload.end(buffer);
});
exports.uploadBuffer = uploadBuffer;
