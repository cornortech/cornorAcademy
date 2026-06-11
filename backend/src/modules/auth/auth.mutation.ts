import { AppRouteMutationImplementation } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import prisma from "../../libs/db";
import { getStorage } from "firebase-admin/storage";

const uploadLegalAgreement: AppRouteMutationImplementation<typeof authContract.uploadLegalAgreement> = async ({ req }) => {
  try {
    const studentId = req.user!.id;
    const { agreementURL } = req.body;

    if (!studentId) {
      return { status: 401, body: { success: false, error: "Unauthorized" } };
    }

    const agreementExists = await prisma.courseAgreement.findFirst({ where: { studentId } });
    if (agreementExists) {
      return { status: 400, body: { success: false, error: "Agreement Already Submitted" } };
    }

    await prisma.courseAgreement.create({ data: { agreementURL, student: { connect: { id: studentId } } } });
    await prisma.student.update({ where: { id: studentId }, data: { status: "portalActivated" } });

    return { status: 201, body: { success: true, message: "Agreement Uploaded Successfully" } };
  } catch (error) {
    console.error("Error creating agreement:", error);
    return { status: 500, body: { success: false, error: "Internal Server Error" } };
  }
};

const storageBucket = getStorage().bucket();

function extractFirebasePath(url: string) {
  const base = url.split("/o/")[1];
  const path = base.split("?")[0];
  return decodeURIComponent(path);
}

const updateStudentDetails: AppRouteMutationImplementation<typeof authContract.updateStudentDetails> = async ({ req }) => {
  try {
    const studentId = req.user!.id;
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      return { status: 404, body: { success: false, error: "Student not found" } };
    }

    const { name, email, phoneNumber, gender, image, dob, address, city, district, pincode, country, about, educationInstitute, qualification } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (gender) updateData.gender = gender;
    if (image) updateData.image = image;
    if (dob) updateData.dob = dob;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (district) updateData.district = district;
    if (pincode) updateData.pincode = pincode;
    if (country) updateData.country = country;
    if (about) updateData.about = about;
    if (educationInstitute) updateData.educationInstitute = educationInstitute;
    if (qualification) updateData.qualification = qualification;

    let oldImage: string | undefined;
    if (image && image !== student.image) {
      oldImage = student.image;
      updateData.image = image;
    }

    await prisma.student.update({ where: { id: studentId }, data: updateData });

    if (oldImage) {
      try {
        const oldPath = extractFirebasePath(oldImage);
        await storageBucket.file(oldPath).delete();
      } catch (error) {
        console.error("Failed to delete old firebase image:", error);
      }
    }

    return { status: 200, body: { success: true, message: "Account updated successfully" } };
  } catch (error) {
    console.error("Error updating student details:", error);
    return { status: 500, body: { success: false, error: "Internal server error" } };
  }
};

export const authMutationHandlers = {
  updateStudentDetails,
  uploadLegalAgreement,
};
