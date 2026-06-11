"use client";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();
  const platformName = settings?.platformName || "Cornor Academy";
  const email = settings?.supportEmail || "info@cornor.academy";
  const facebookUrl = settings?.facebookUrl || "https://facebook.com/cornoracademy";
  const instagramUrl = settings?.instagramUrl || "https://instagram.com/cornor.academy";
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-4 gap-8">
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
              <span className="text-xl font-bold">{platformName}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {
                "Empowering learners worldwide with comprehensive online education."
              }
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${email}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {email}
              </a>
            </div>

            <div className="flex gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

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
                  href={"/teachers" as any}
                  className="hover:text-foreground transition-colors"
                >
                  {"For Teachers"}
                </Link>
              </li>
              <li>
                <Link
                  href={"/enterprise" as any}
                  className="hover:text-foreground transition-colors"
                >
                  {"Enterprise"}
                </Link>
              </li>
              <li>
                <Link
                  href={"/pricing" as any}
                  className="hover:text-foreground transition-colors"
                >
                  {"Pricing"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{"Support"}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                  <Link
                    href={"/help" as any}
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
                    href={"/community" as any}
                    className="hover:text-foreground transition-colors"
                  >
                    {"Community"}
                  </Link>
              </li>
            </ul>
          </div>

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
                    href={"/careers" as any}
                    className="hover:text-foreground transition-colors"
                  >
                    {"Careers"}
                  </Link>
              </li>
              <li>
                  <Link
                    href={"/privacy" as any}
                    className="hover:text-foreground transition-colors"
                  >
                    {"Privacy Policy"}
                  </Link>
              </li>
              <li>
                  <Link
                    href={"/terms" as any}
                    className="hover:text-foreground transition-colors"
                  >
                    {"Terms of Service"}
                  </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {platformName}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
