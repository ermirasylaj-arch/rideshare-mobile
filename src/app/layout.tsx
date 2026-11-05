import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rruga | Udhëtime për në AAB",
  description: "Gjej një udhëtim të përbashkët për në kampusin AAB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Rruga, faqja kryesore">
            <span className="brand__mark" aria-hidden="true">R</span>
            <span>rruga<span className="brand__dot">.</span></span>
          </Link>
          <span className="site-header__tag">UDHËTIME PËR AAB</span>
        </header>
        {children}
        <footer className="site-footer">
          <span>Projekt mësimor · Të dhëna fiktive</span>
          <span>Udhëto bashkë, mbërrij më lehtë.</span>
        </footer>
      </body>
    </html>
  );
}
