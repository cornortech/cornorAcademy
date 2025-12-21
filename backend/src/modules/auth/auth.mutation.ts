import { AppRouteMutationImplementation } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import prisma from "../../libs/db";
import { getStorage } from "firebase-admin/storage";

const registerStudent: AppRouteMutationImplementation<
  typeof authContract.registerStudent
> = async ({ req }) => {
  try {
    const {
      uid,
      name,
      email,
      phoneNumber,
      gender,
      image,
      dob,
      address,
      city,
      district,
      pincode,
      country,
      about,
      educationInstitute,
      qualification,
    } = req.body;

    const studentExists = await prisma.student.findFirst({
      where: {
        OR: [{ uid }, { email }, { phoneNumber }],
      },
    });

    if (studentExists) {
      return {
        status: 400,
        body: {
          success: false,
          error: "Student with same uid, email or phone number already exists",
        },
      };
    }

    const newStudent = await prisma.student.create({
      data: {
        uid,
        name,
        email,
        phoneNumber,
        gender,
        image,
        dob,
        address,
        city,
        district,
        pincode,
        country,
        about,
        educationInstitute,
        qualification,
      },
    });

    return {
      status: 201,
      body: {
        success: true,
        studentId: newStudent.id,
        message: "Account created successfully",
      },
    };
  } catch (error) {
    console.error("Error creating student:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Internal server error",
      },
    };
  }
};

type UserRole = "student" | "teacher" | "admin";

function getRedirectUrl(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "teacher":
      return "/teacher";
    case "student":
      return "/student";
    default:
      return "/";
  }
}

const login: AppRouteMutationImplementation<
  typeof authContract.login
> = async ({ req }) => {
  try {
    const { email, password } = req.body;

    // Determine role early
    let role = req.user?.role;

    // Fetch users
    let user: any = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (user) role = "student";
    else {
      user = await prisma.teacher.findUnique({
        where: {
          email,
        },
      });
      if (user) role = "teacher";
      else {
        user = await prisma.admin.findUnique({
          where: {
            email,
          },
        });
        role = "admin";
      }
    }

    // if (role === "student") {
    //   user = await prisma.student.findUnique({
    //     where: {
    //       email,
    //     },
    //   });
    // } else if (role === "teacher") {
    //   user = await prisma.teacher.findUnique({
    //     where: {
    //       email,
    //     },
    //   });
    // } else if (role === "admin") {
    //   user = await prisma.admin.findUnique({
    //     where: {
    //       email,
    //     },
    //   });
    // }

    if (role === "student") {
      switch (user.status) {
        case "registered":
          return {
            status: 200,
            body: {
              uid: user.uid || "",
              id: user.id,
              name: user.name,
              email: user.email,
              role: "student",
              status: user.status,
              redirectionUrl: "/legal-agreement",
            },
          };
        case "portalActivated":
          break; // allowed
        case "portalDeactivated":
          return {
            status: 403,
            body: {
              success: false,
              error: "Student Platform access is deactivated",
            },
          };
        case "rejected":
          return {
            status: 403,
            body: {
              success: false,
              error: "Student Registration rejected",
            },
          };
        default:
          return {
            status: 500,
            body: {
              success: false,
              error: "Unknown status",
            },
          };
      }
    }

    if (role === "teacher") {
      switch (user.status) {
        case "registered":
          return {
            status: 403,
            body: {
              success: false,
              error: "Teacher is not activated",
            },
          };
        case "portalActivated":
          break; // allowed
        case "portalDeactivated":
          return {
            status: 403,
            body: {
              success: false,
              error: "Teacher Platform access is deactivated",
            },
          };
        case "rejected":
          return {
            status: 403,
            body: {
              success: false,
              error: "Teacher Registration rejected",
            },
          };
        default:
          return {
            status: 500,
            body: {
              success: false,
              error: "Unknown status",
            },
          };
      }
    }

    if (role === "admin") {
    }

    return {
      status: 200,
      body: {
        uid: user.uid || "",
        id: user.id,
        name: (user as any).name || "",
        email: user.email,
        role: role || "admin",
        redirectionUrl: role ? getRedirectUrl(role) : "/",
        status: role === "admin" ? undefined : user.status,
      },
    };
  } catch (error) {
    console.error("Error Login:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Internal server error",
      },
    };
  }
};

const uploadLegalAgreement: AppRouteMutationImplementation<
  typeof authContract.uploadLegalAgreement
> = async ({ req }) => {
  try {
    const studentId = req.user!.id;

    const { agreementURL } = req.body;

    if (!studentId) {
      return {
        status: 401,
        body: {
          success: false,
          error: "Unauthorized",
        },
      };
    }

    const agreementExists = await prisma.courseAgreement.findFirst({
      where: {
        studentId,
      },
    });

    if (agreementExists) {
      return {
        status: 400,
        body: {
          success: false,
          error: "Agreement Already Submitted",
        },
      };
    }

    const agreement = await prisma.courseAgreement.create({
      data: {
        agreementURL,
        student: {
          connect: { id: studentId! },
        },
      },
    });

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        status: "portalActivated",
      },
    });

    return {
      status: 201,
      body: {
        success: true,
        message: "Agreement Uploaded Successfully",
      },
    };
  } catch (error) {
    console.error("Error creating agreement:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Internal Server Error",
      },
    };
  }
};

const storageBucket = getStorage().bucket();

function extractFirebasePath(url: string) {
  const base = url.split("/o/")[1];
  const path = base.split("?")[0];
  return decodeURIComponent(path);
}

const updateStudentDetails: AppRouteMutationImplementation<
typeof authContract.updateStudentDetails
> = async ({ req }) => {
  try {
    const studentId = req.user!.id;

    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return {
        status: 404,
        body: {
          success: false,
          error: "Student not found",
        },
      };
    }

    const {
      name,
      email,
      phoneNumber,
      gender,
      image,
      dob,
      address,
      city,
      district,
      pincode,
      country,
      about,
      educationInstitute,
      qualification,
    } = req.body;

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

    let oldImage: string | undefined = undefined;

    if (image && image !== student.image) {
      oldImage = student.image;
      updateData.image = image;
    }

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: updateData,
    });

    if (oldImage) {
      try {
        const oldPath = extractFirebasePath(oldImage);
        await storageBucket.file(oldPath).delete();
      } catch (error) {
        console.error("Failed to delete old firebase image:", error);
      }
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "Account updated successfully",
      },
    };
  } catch (error) {
    console.error("Error updating student details:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Internal server error",
      },
    };
  }
};

export const authMutationHandlers = {
  registerStudent,
  login,
  updateStudentDetails,
  uploadLegalAgreement,
};
