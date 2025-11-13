import { ArrowLeft, BookOpen } from "lucide-react";
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {showNav && !showBackButton && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#courses"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Courses
              </Link>
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#verify-certificate"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Verify Certificate
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicHeader;
