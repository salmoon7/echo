"use client";
import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function TranslatePage() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("en"); // default target: English

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });

      const data = await res.json();
      setTranslated(data.translated || "Translation failed.");
      setIsModalOpen(true);
      setCopied(false);
    } catch (err) {
      console.error("Translation request failed:", err);
      setTranslated("Translation request failed. Try again.");
      setIsModalOpen(true);
      setCopied(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 sm:p-12 bg-white text-[#111827] flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">
        Translator
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Translate any text from any language to your preferred language instantly.
      </p>

      {/* Input Area */}
      <textarea
        className="w-full max-w-3xl p-4 rounded-2xl border-2 border-[#A3C4F3] shadow-sm focus:ring-2 focus:ring-[#3B82F6] focus:outline-none mb-4 text-gray-700"
        rows={6}
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Language Selector */}
      <select
        className="w-full max-w-3xl p-3 mb-6 rounded-xl border-2 border-[#A3C4F3] focus:ring-2 focus:ring-[#3B82F6] focus:outline-none"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="ar">Arabic</option>
        <option value="hi">Hindi</option>
      </select>

      {/* Translate Button */}
      <button
        onClick={handleTranslate}
        disabled={loading}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Translated Text
        </h2>
        <p className="text-gray-700 mb-4">{translated}</p>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#3B82F6] text-white font-semibold shadow hover:bg-[#2563EB] transition"
        >
          {copied ? <Check className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </Modal>
    </div>
  );
}
