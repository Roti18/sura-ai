import React from "react";
import { Github, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Roti18",
      icon: <Github size={20} />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/roti.co.id",
      icon: <Instagram size={20} />,
    },
    {
      name: "Email",
      href: "mailto:exrt18@gmail.com",
      icon: <Mail size={20} />,
    },
  ];

  return (
    <footer className="backdrop-blur-lg bg-white/5 border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left - Logo & Description */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <span className="text-xl font-bold text-white">SURA AI</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Sura AI lahir dari keresahan. Ini bukan sekadar teknologi, tapi
              suara masyarakat yang menolak dibungkam dan memilih menjawab
              dengan kecerdasan.
            </p>
          </div>

          <div className="md:w-1/2 flex flex-col items-start md:items-end">
            <div className="flex gap-3 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/20"
                  aria-label={link.name}
                >
                  <div className="text-gray-300 hover:text-white transition-colors">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} SURA AI. All Right Reversed.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
