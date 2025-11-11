import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { APP_NAME } from "@/lib/config";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold">{APP_NAME}</span>
      </div>

      <h1 className="text-2xl font-bold text-balance">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
