import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { APP_NAME } from "@/lib/config";

interface PublicHeaderProps {
  showNav?: boolean;
  showBackButton?: boolean;
}

const PublicHeader = ({
  showNav = true,
  showBackButton = false,
}: PublicHeaderProps) => {
  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            )}
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt={APP_NAME} className="h-12 w-12 object-contain" />
              <span className="text-xl font-bold text-foreground">{APP_NAME}</span>
            </Link>
          </div>

          {showNav && !showBackButton && <></>}

          <div />
        </div>
      </div>
    </nav>
  );
};

export default PublicHeader;
