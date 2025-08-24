"use client";
export const dynamic = "force-dynamic";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Brain, Github, Chrome } from "lucide-react";
import { Suspense } from "react";

// Komponen yang menggunakan useSearchParams
function LoginContent() {
  const params = useSearchParams();
  const from = params.get("from");

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-950 via-black to-red-900">
      {/* background animasi gradient blur merah */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-red-800/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* card login */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/40 mb-4">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">
            Login ke <span className="text-red-400">SURA AI</span>
          </h1>
          {from === "chat" ? (
            <p className="text-sm text-red-400 mt-2">
              Login dulu sebelum memulai
            </p>
          ) : (
            <p className="text-sm text-gray-300 mt-2">
              Pilih provider favoritmu untuk lanjut
            </p>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/chat" })}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600/30 to-red-700/30 border border-red-500/40 hover:border-red-400/70 hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300"
          >
            <Chrome className="w-5 h-5 text-red-300" />
            <span className="font-medium">Login dengan Google</span>
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/chat" })}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600/30 to-red-700/30 border border-red-500/40 hover:border-red-400/70 hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300"
          >
            <Github className="w-5 h-5 text-red-300" />
            <span className="font-medium">Login dengan GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
// Loading component
function LoginLoading() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-950 via-black to-red-900">
      {/* background animasi gradient blur merah */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-red-800/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* loading card */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/40 mb-4 animate-pulse">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div className="w-32 h-4 bg-white/20 rounded animate-pulse mb-2"></div>
          <div className="w-24 h-3 bg-white/10 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Main component dengan Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}
