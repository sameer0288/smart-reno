import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartReno | Construction-Tech Integration",
  description: "Seamlessly connecting homeowners and contractors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="glass-header sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-main"></div>
            <span className="font-outfit text-xl font-bold tracking-tight">SmartReno</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-fg-muted">
            <a href="/" className="hover:text-white transition">Homeowner</a>
            <a href="/dashboard" className="hover:text-white transition">Contractor</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
          </div>
          <button className="btn-primary text-sm px-5 py-2.5">Get Started</button>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="px-6 py-12 border-t border-glass text-center text-fg-muted text-sm italic">
          &copy; 2026 SmartReno. Proudly built for the Modern Contractor.
        </footer>
      </body>
    </html>
  );
}
