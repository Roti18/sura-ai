import React, { useState } from "react";
import { Menu, X, Brain } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-4 left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50">
        <nav className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-6 sm:px-8 py-3 flex gap-6 items-center justify-center">
          <div className="hidden sm:flex gap-6 items-center justify-center">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-red-400 font-medium transition-colors duration-200 px-3 py-1 rounded-full"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button
            className="flex sm:hidden bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg border border-white/20 hover:border-red-400/50 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div
            className="absolute top-0 right-0 w-64 h-full 
  bg-white/10 backdrop-blur-2xl 
  border-l border-white/20 
  shadow-2xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-red-400" />
                  <span className="text-white font-bold">SURA AI</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-red-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-white/80 hover:text-red-400 font-medium transition-colors duration-200 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8">
                <Link
                  href="#get-started"
                  className="block w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-6 py-3 rounded-full text-center shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mulai Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
