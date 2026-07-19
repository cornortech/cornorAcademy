import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/config";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="text-center mb-5">
      
      <Link
        href="/"
        className="inline-flex items-center space-x-2 mb-3 hover:opacity-80 transition-opacity"
      >
        <div className="h-8 w-8 rounded-lg flex items-center justify-center">
          <Image
            src="/logo/logo.png"
            alt={`${APP_NAME} Logo`}
            width={34}
            height={34}
            className="object-contain"
          />
        </div>
        <span className="text-xl font-bold">{APP_NAME}</span>
      </Link>

      <h1 className="text-xl font-bold text-balance">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
