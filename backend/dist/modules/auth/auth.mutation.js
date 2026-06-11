"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMutationHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const storage_1 = require("firebase-admin/storage");
const uploadLegalAgreement = async ({ req }) => {
    try {
        const studentId = req.user.id;
        const { agreementURL } = req.body;
        if (!studentId) {
            return { status: 401, body: { success: false, error: "Unauthorized" } };
        }
        const agreementExists = await db_1.default.courseAgreement.findFirst({ where: { studentId } });
        if (agreementExists) {
            return { status: 400, body: { success: false, error: "Agreement Already Submitted" } };
        }
        await db_1.default.courseAgreement.create({ data: { agreementURL, student: { connect: { id: studentId } } } });
        return { status: 201, body: { success: true, message: "Agreement Uploaded Successfully" } };
    }
    catch (error) {
        console.error("Error creating agreement:", error);
        return { status: 500, body: { success: false, error: "Internal Server Error" } };
    }
};
const storageBucket = (0, storage_1.getStorage)().bucket();
function extractFirebasePath(url) {
    const base = url.split("/o/")[1];
    const path = base.split("?")[0];
    return decodeURIComponent(path);
}
const updateStudentDetails = async ({ req }) => {
    try {
        const studentId = req.user.id;
        const student = await db_1.default.student.findUnique({ where: { id: studentId } });
        if (!student) {
            return { status: 404, body: { success: false, error: "Student not found" } };
        }
        const { name, email, phoneNumber, gender, image, dob, address, city, district, pincode, country, about, educationInstitute, qualification } = req.body;
        const updateData = {};
        if (name)
            updateData.name = name;
        if (email)
            updateData.email = email.toLowerCase();
        if (phoneNumber)
            updateData.phoneNumber = phoneNumber;
        if (gender)
            updateData.gender = gender;
        if (image)
            updateData.image = image;
        if (dob)
            updateData.dob = dob;
        if (address)
            updateData.address = address;
        if (city)
            updateData.city = city;
        if (district)
            updateData.district = district;
        if (pincode)
            updateData.pincode = pincode;
        if (country)
            updateData.country = country;
        if (about)
            updateData.about = about;
        if (educationInstitute)
            updateData.educationInstitute = educationInstitute;
        if (qualification)
            updateData.qualification = qualification;
        let oldImage;
        if (image && image !== student.image) {
            oldImage = student.image;
            updateData.image = image;
        }
        await db_1.default.student.update({ where: { id: studentId }, data: updateData });
        if (oldImage) {
            try {
                const oldPath = extractFirebasePath(oldImage);
                await storageBucket.file(oldPath).delete();
            }
            catch (error) {
                console.error("Failed to delete old firebase image:", error);
            }
        }
        return { status: 200, body: { success: true, message: "Account updated successfully" } };
    }
    catch (error) {
        console.error("Error updating student details:", error);
        return { status: 500, body: { success: false, error: "Internal server error" } };
    }
};
exports.authMutationHandlers = {
    updateStudentDetails,
    uploadLegalAgreement,
};
