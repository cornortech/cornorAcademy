import { UserRole } from "@/types";

export function getDashboardPathForRole(role: UserRole): string {
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
