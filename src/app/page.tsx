import Link from "next/link";
import { FileText, Globe, Mic } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-[#111827] p-6 sm:p-12">
      
      {/* Hero Section */}
      <header className="w-full text-center mb-16 relative">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-snug">
            Echo <span className="text-[#3B82F6]">AI</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl mb-6">
            Summarize, Translate & Speak — your AI assistant in one place.
          </p>
          <Link href="/summarize">
  <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
    Get Started
  </button>
</Link>

        </div>

       
      </header>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 w-full max-w-6xl mb-16">
        {/* Summarizer */}
        <Link href="/summarize">
          <div className="group bg-gradient-to-br from-[#A3C4F3]/30 to-[#F0F6FF]/40 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="p-4 rounded-full bg-[#3B82F6]/20 mb-4">
              <FileText className="w-12 h-12 text-[#3B82F6]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Summarizer</h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Quickly condense long articles or text into key points.
            </p>
          </div>
        </Link>

        {/* Translator */}
        <Link href="/translate">
          <div className="group bg-gradient-to-br from-[#A3C4F3]/30 to-[#F0F6FF]/40 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="p-4 rounded-full bg-[#3B82F6]/20 mb-4">
              <Globe className="w-12 h-12 text-[#3B82F6]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Translator</h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Translate summaries or text into any language instantly.
            </p>
          </div>
        </Link>

        {/* Voice Input */}
        <Link href="/voice">
          <div className="group bg-gradient-to-br from-[#A3C4F3]/30 to-[#F0F6FF]/40 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="p-4 rounded-full bg-[#3B82F6]/20 mb-4">
              <Mic className="w-12 h-12 text-[#3B82F6]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Voice Input</h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Speak naturally and get your voice converted to text.
            </p>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-auto text-gray-400 text-sm text-center mb-6 sm:mb-0">
        Built with ❤️ using React, Next.js, Tailwind, Hugging Face, LibreTranslate & Web Speech API
      </footer>
    </div>
  );
}
