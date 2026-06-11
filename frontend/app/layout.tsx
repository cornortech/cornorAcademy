import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
default: "Cornor Academy | Empower Your Learning Journey",
template: "%s | Cornor Academy",
  },
  description: "Cornor Academy is a online learning management system (LMS) designed to empower learners and educators. With a user-friendly interface, robust features, and a focus on personalized learning, Cornor Academy provides an engaging platform for students to acquire new skills and knowledge. Whether you're a student looking to enhance your education or an educator seeking to create impactful courses, Cornor Academy is your go-to destination for a transformative learning experience.",
  keywords: [
    "online learning",
    "learning management system",
    "LMS",
    "education platform",
    "e-learning",
    "course management",
    "web development",
    "graphic design",
    "artificial intelligence",
    "personalized learning",
    "interactive courses",
    "UI UX design",
    "digital marketing",
  ],
  authors: [{name: "Cornor Academy Team", url: "https://cornoracademy.com"}],
  creator: 'Cornor Tech Pvt. Ltd.',
  alternates: {
    canonical: "https://cornoracademy.com",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Cornor Academy | Empower Your Learning Journey",
    description: "Cornor Academy is a online learning management system (LMS) designed to empower learners and educators. With a user-friendly interface, robust features, and a focus on personalized learning, Cornor Academy provides an engaging platform for students to acquire new skills and knowledge. Whether you're a student looking to enhance your education or an educator seeking to create impactful courses, Cornor Academy is your go-to destination for a transformative learning experience.",
    url: "https://cornoracademy.com",
    siteName: "Cornor Academy",
    images: [
      {
        url: "https://cornoracademy.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cornor Academy Open Graph Image",
      }
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornor Academy | Empower Your Learning Journey",
    description: "Cornor Academy is a online learning management system (LMS) designed to empower learners and educators. With a user-friendly interface, robust features, and a focus on personalized learning, Cornor Academy provides an engaging platform for students to acquire new skills and knowledge. Whether you're a student looking to enhance your education or an educator seeking to create impactful courses, Cornor Academy is your go-to destination for a transformative learning experience.",
    image: "https://cornoracademy.com/og-image.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background  ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
