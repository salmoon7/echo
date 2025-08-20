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

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setSummary(data.summary || "Unable to summarize");
      setIsModalOpen(true);
      setCopied(false);
    } catch (error) {
      console.error("Error summarizing:", error);
      setSummary("Failed to summarize. Try again.");
      setIsModalOpen(true);
      setCopied(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 sm:p-12 bg-white text-[#111827] flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">
        Summarizer
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Paste your text or article here and get a concise summary instantly.
      </p>

      {/* Input Area */}
      <textarea
        className="w-full max-w-3xl p-4 rounded-2xl border-2 border-[#A3C4F3] shadow-sm focus:ring-2 focus:ring-[#3B82F6] focus:outline-none mb-6 text-gray-700"
        rows={6}
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Summarize Button */}
      <button
        onClick={handleSummarize}
        disabled={loading}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-center">Summary</h2>
        <p className="text-gray-700 mb-4">{summary}</p>
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
