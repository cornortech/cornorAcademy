// AuthHeader is a reusable component for displaying the header section on authentication pages (login, register, etc.). It includes a back link to the home page, the app logo and name, and a title and description for the specific auth page.
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/lib/config";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">

      {/* ===== Back To Home ===== */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>
      {/* ===== End Back To Home ===== */}


      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center">
          <Image
            src="/logo/logo.png"
            alt={`${APP_NAME} Logo`}
            width={43}
            height={43}
            className="object-contain"
          />
        </div>
        <span className="text-2xl font-bold">{APP_NAME}</span>
      </div>

      <h1 className="text-2xl font-bold text-balance">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
