import { AuthHeader } from "@/components/features/auth/AuthHeader";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { AuthenticatedRedirect } from "@/components/features/auth/AuthenticatedRedirect";

export default function LoginPage() {
  return (
    <AuthenticatedRedirect>
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <AuthHeader title="Welcome back" description="Sign in to your account to continue learning" />
        
        <LoginForm />
      </div>
    </div>
    </AuthenticatedRedirect>
  );
}
