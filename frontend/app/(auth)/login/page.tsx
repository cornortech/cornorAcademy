import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { LoginForm } from "@/components/features/auth/LoginForm";
import { AuthenticatedRedirect } from "@/components/features/auth/AuthenticatedRedirect";
import { APP_NAME } from "@/lib/config";

export default function LoginPage() {
  return (
    <AuthenticatedRedirect>
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

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

          <h1 className="text-2xl font-bold text-balance">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue learning
          </p>
        </div>

        <LoginForm />

      </div>
    </div>
    </AuthenticatedRedirect>
  );
}
