"use client";

import { useState } from "react";
import {
  Star,
  Shield,
  Zap,
  Users,
  Globe,
  Brain,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Kecerdasan Lokal",
    description:
      "Dilatih dengan data dan konteks budaya Indonesia untuk memahami nuansa bahasa dan kebutuhan masyarakat Indonesia.",
  },
  {
    icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Privasi Terjamin",
    description:
      "Data Anda aman dan diproses sesuai dengan regulasi Indonesia. Komitmen penuh terhadap keamanan informasi.",
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Respons Cepat",
    description:
      "Teknologi AI terdepan yang memberikan jawaban akurat dalam hitungan detik dengan pemahaman konteks yang mendalam.",
  },
  {
    icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Untuk Semua",
    description:
      "Mudah digunakan untuk berbagai kalangan, dari pelajar, professional, hingga UMKM dengan antarmuka yang intuitif.",
  },
  {
    icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Multibahasa",
    description:
      "Mendukung Bahasa Indonesia dan bahasa daerah, memahami slang dan ungkapan lokal dengan natural.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Terpercaya",
    description:
      "Dikembangkan oleh talenta terbaik Indonesia dengan standar internasional dan nilai-nilai Pancasila.",
  },
];

const stats = [
  { number: "1+", label: "Pengguna Aktif" },
  { number: "99.9%", label: "Uptime" },
  { number: "50+", label: "Bahasa Daerah" },
  { number: "24/7", label: "Dukungan" },
];

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="font-sans bg-black min-h-screen relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-700/20 pointer-events-none"></div>

      <div className="relative z-10">
        <Header />

        <div className="h-20"></div>

        <main
          className="flex flex-col gap-6 sm:gap-8 items-center pt-10 sm:pt-24 px-4 pb-16 sm:pb-20"
          id="#/"
        >
          <div className="text-center space-y-4 sm:space-y-6 max-w-6xl w-full mt-2 sm:mt-0">
            <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-500 leading-tight px-2">
              SURA AI
            </h1>
            <div className="text-base sm:text-lg lg:text-xl text-gray-300 mb-2 sm:mb-4">
              <span className="text-red-400 font-semibold">Suara Rakyat</span> •
              Artificial Intelligence
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-4">
              Platform Kecerdasan Buatan pertama Indonesia yang memahami jiwa
              dan semangat bangsa.
              <span className="text-red-400 font-semibold block sm:inline mt-2 sm:mt-0">
                {" "}
                Dari rakyat, oleh rakyat, untuk rakyat.
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-md sm:max-w-none sm:justify-center items-center">
            <Link
              href="/sura"
              className="group bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-red-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Mulai Sekarang
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mt-8 sm:mt-16 w-full max-w-6xl px-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-3 sm:p-4 lg:p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/20 hover:border-red-400/50 transition-colors shadow-lg hover:shadow-red-500/10"
              >
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-red-400 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* About Section */}
        <section id="about" className="px-4 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                Mengapa <span className="text-red-400">SURA AI?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
                SURA AI hadir sebagai wujud semangat kemerdekaan di era digital.
                Kami percaya bahwa teknologi AI harus dapat diakses, dipahami,
                dan bermanfaat bagi seluruh rakyat Indonesia.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">
              <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Suara Rakyat dalam Teknologi
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  SURA AI dikembangkan dengan mendengarkan aspirasi masyarakat
                  Indonesia. Kami memahami bahwa setiap daerah memiliki keunikan
                  bahasa, budaya, dan kebutuhan yang berbeda.
                </p>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Dengan teknologi Natural Language Processing yang canggih,
                  SURA AI dapat memahami konteks percakapan dalam Bahasa
                  Indonesia dengan nuansa lokal yang autentik.
                </p>
                <div className="flex items-center gap-3 text-red-400">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">
                    Dibuat dengan ❤️ di Indonesia
                  </span>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-transparent rounded-2xl blur-3xl"></div>

                {/* Glassmorphism Card */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-400 mb-2">
                        100%
                      </div>
                      <div className="text-gray-200 text-xs sm:text-sm">
                        Karya Anak Bangsa
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-400 mb-2">
                        17K+
                      </div>
                      <div className="text-gray-200 text-xs sm:text-sm">
                        Pulau Terjangkau
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-400 mb-2">
                        300+
                      </div>
                      <div className="text-gray-200 text-xs sm:text-sm">
                        Suku Didukung
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-400 mb-2">
                        ∞
                      </div>
                      <div className="text-gray-200 text-xs sm:text-sm">
                        Potensi Rakyat
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                Keunggulan <span className="text-red-400">SURA AI</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
                Teknologi terdepan yang dirancang khusus untuk memahami dan
                melayani kebutuhan masyarakat Indonesia
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-4 sm:p-6 lg:p-8 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-lg ${
                    activeFeature === index
                      ? "bg-gradient-to-br from-red-600/20 to-red-800/10 border-red-500/60 shadow-xl shadow-red-500/20"
                      : "bg-white/5 border-white/20 hover:border-red-400/40 hover:bg-white/10 shadow-lg hover:shadow-red-500/10"
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                  onClick={() => setActiveFeature(index)}
                >
                  <div
                    className={`inline-flex p-2 sm:p-3 rounded-xl mb-3 sm:mb-4 transition-colors ${
                      activeFeature === index
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-white/10 text-red-400 group-hover:bg-red-600 group-hover:text-white backdrop-blur-sm"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 lg:py-20 relative">
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                Siap Merasakan Kekuatan{" "}
                <span className="text-red-400">SURA AI?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Bergabunglah dengan jutaan orang Indonesia yang telah merasakan
                manfaat AI yang memahami jiwa bangsa
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                <Link
                  href="#register"
                  className="group bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-red-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Coba Gratis Sekarang
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
