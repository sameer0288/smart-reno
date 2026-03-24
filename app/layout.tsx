import type { Metadata } from "next";
import { Inter, Outfit } from 'next/font/google';
import Link from "next/link";
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "SmartReno | Precision Construction OS",
  description: "The intelligent operating layer for homeowners and contractors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased selection:bg-blue-500/30 selection:text-white bg-bg-deep font-inter">
        {/* Global Background Elements */}
        <div className="fixed inset-0 z-0 bg-transparent pointer-events-none overflow-hidden">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full" />
           <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full" />
        </div>

        {/* Dynamic Global Header (Responsive) */}
        <nav className="glass-header sticky top-0 z-[100] px-6 lg:px-12 py-5 flex items-center justify-between mx-auto mt-6 rounded-[24px] border border-white/5 backdrop-blur-3xl transition-all duration-500 hover:border-white/10" 
             style={{ maxWidth: '1400px', width: '92%' }}>
          
            <Link href="/" className="flex items-center gap-4 group cursor-pointer no-underline text-white">
               <div className="w-10 h-10 rounded-xl bg-gradient-main shadow-2xl shadow-blue-500/20 flex items-center justify-center font-outfit font-black italic transition-transform group-hover:scale-110">SR</div>
               <span className="font-outfit text-2xl font-black tracking-tighter hidden sm:block">SmartReno<span className="text-blue-500 font-medium">.OS</span></span>
            </Link>


           <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-fg-muted">
              <a href="/" className="hover:text-white transition-all hover:tracking-[0.3em]">Network</a>
              <a href="/dashboard" className="hover:text-white transition-all hover:tracking-[0.3em]">Contractor Hub</a>
              <a href="#" className="hover:text-white transition-all hover:tracking-[0.3em]">Integrations</a>
           </div>

           <div className="flex items-center gap-4">
              <button className="text-xs font-black uppercase tracking-widest text-fg-muted hover:text-white transition hidden md:block">Login</button>
              <button className="btn-primary !px-6 !py-3 text-xs tracking-widest uppercase">Start Project</button>
           </div>
        </nav>

        {/* Main Content Viewport */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>

        {/* Aesthetic Global Footer */}
        <footer className="relative z-10 px-8 py-24 border-t border-white/5 bg-black/40 backdrop-blur-3xl mt-20">
           <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16 text-center lg:text-left">
              <div className="space-y-6">
                 <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-outfit font-black text-white italic text-xs">SR</div>
                    <span className="font-outfit text-2xl font-black tracking-tighter">SmartReno</span>
                 </div>
                 <p className="text-fg-muted text-sm font-medium tracking-wide max-w-sm mx-auto lg:mx-0 opacity-60">
                    The intelligence layer for the modern construction economy. Vetted pros, real-time sync, and unparalleled transparency.
                 </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-xs font-black uppercase tracking-[0.2em] text-fg-muted">
                 <div className="space-y-6">
                    <p className="text-white opacity-40">Network</p>
                    <a href="#" className="block hover:text-white transition-colors">Estimators</a>
                    <a href="#" className="block hover:text-white transition-colors">Contractors</a>
                 </div>
                 <div className="space-y-6">
                    <p className="text-white opacity-40">Resources</p>
                    <a href="#" className="block hover:text-white transition-colors">API Docs</a>
                    <a href="#" className="block hover:text-white transition-colors">Audit Trail</a>
                 </div>
                 <div className="space-y-6 hidden md:block">
                    <p className="text-white opacity-40">Social</p>
                    <a href="#" className="block hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="block hover:text-white transition-colors">LinkedIn</a>
                 </div>
              </div>
           </div>
           
           <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale">
              <p className="text-[10px] font-black uppercase tracking-widest">
                 &copy; 2026 SmartReno Technologies Inc. Build with precision.
              </p>
              <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
                 <a href="#" className="hover:text-white">Privacy Node</a>
                 <a href="#" className="hover:text-white">Terms of Ops</a>
              </div>
           </div>
        </footer>
      </body>
    </html>
  );
}
