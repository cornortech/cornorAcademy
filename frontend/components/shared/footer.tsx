import { APP_NAME } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== FOOTER CONTENT ===== */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* ===== Company Info ===== */}
          <div>

            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {
                "Empowering learners worldwide with comprehensive online education."
              }
            </p>
          </div>
          {/* ===== EndCompany Info ===== */}

          {/* ===== Platform Links ===== */}
          <div>
            <h3 className="font-semibold mb-4">{"Platform"}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-foreground transition-colors"
                >
                  {"Courses"}
                </Link>
              </li>
              <li>
                <Link
                  href="/teachers"
                  className="hover:text-foreground transition-colors"
                >
                  {"For Teachers"}
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="hover:text-foreground transition-colors"
                >
                  {"Enterprise"}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-foreground transition-colors"
                >
                  {"Pricing"}
                </Link>
              </li>
            </ul>
          </div>
          {/* ===== End Platform Links ===== */}

          {/* ===== Support Links ===== */}
          <div>
            <h3 className="font-semibold mb-4">{"Support"}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/help"
                  className="hover:text-foreground transition-colors"
                >
                  {"Help Center"}
                </Link>
              </li>
              <li>
                <Link
                  href="/verify-certificate"
                  className="hover:text-foreground transition-colors"
                >
                  {"Verify Certificate"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  {"Contact Us"}
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="hover:text-foreground transition-colors"
                >
                  {"Community"}
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/status"
                  className="hover:text-foreground transition-colors"
                >
                  {"System Status"}
                </Link>
              </li> */}
            </ul>
          </div>
          {/* ===== End Support Links ===== */}

          {/* ===== Company Links ===== */}
          <div>
            <h3 className="font-semibold mb-4">{"Company"}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  {"About Us"}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-foreground transition-colors"
                >
                  {"Careers"}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  {"Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  {"Terms of Service"}
                </Link>
              </li>
            </ul>
          </div>
          {/* ===== End Company Links ===== */}

        </div>
        {/* ===== END FOOTER CONTENT ===== */}

        {/* ===== FOOTER BOTTOM ===== */}
        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
        {/* ===== END FOOTER BOTTOM ===== */}

      </div>
    </footer>
  );
};

export default Footer;
