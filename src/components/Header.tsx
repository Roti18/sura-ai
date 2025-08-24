"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X, Brain, LogOut } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <>
      {/* Header utama */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-auto">
        <nav className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-4 sm:px-8 py-3 flex items-center justify-between w-full">
          {/* Kiri: Burger menu (mobile) */}
          <div className="w-10 sm:w-0">
            <button
              className="flex sm:hidden bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg border border-white/20 hover:border-red-400/50 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Tengah: Menu desktop */}
          <div className="hidden sm:flex gap-6 items-center flex-1 justify-center">
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

          {/* Kanan: Login/Profile dengan margin kiri lebih besar */}
          <div className="ml-8">
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none flex items-center justify-center h-full"
                >
                  <img
                    src={session.user.image ?? "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-red-500/40 hover:scale-105 transition-transform"
                  />
                </button>

                {/* Dropdown desktop only */}
                {dropdownOpen && (
                  <div className="hidden sm:block absolute top-full right-0 mt-2 w-64 bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl p-4 text-white z-50 animate-dropdown">
                    <p className="font-semibold text-lg mb-1">
                      Halo, {session.user.name}
                    </p>
                    <p className="text-sm text-gray-300 mb-3">
                      {session.user.email}
                    </p>
                    <button
                      onClick={() => signOut()}
                      className="w-full bg-red-600/90 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-red-500/25 transition-all">
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar - Sekarang dari kiri */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="absolute top-0 left-0 w-64 h-full bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl transition-transform duration-300 ease-in-out transform translate-x-0">
            <div className="p-6">
              {/* Header dalam sidebar */}
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

              {/* Profile info mobile */}
              {session?.user && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={session.user.image ?? "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full border border-red-500/40"
                    />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full bg-red-600/90 text-white font-semibold px-3 py-2 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}

              {/* Nav menu */}
              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-white/80 hover:text-red-400 font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-dropdown {
          animation: dropdownFade 0.2s ease-out forwards;
        }
        @keyframes dropdownFade {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
