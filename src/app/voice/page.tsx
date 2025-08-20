"use client";
import { useState, useEffect } from "react";
import { Mic, StopCircle, Clipboard, Check, Volume2 } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function VoicePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + chunk + " ");
        } else {
          interim += chunk;
        }
      }
    };
    setRecognition(rec);
  }, []);

  const startRecording = () => {
    if (!recognition) return;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!recognition) return;
    recognition.stop();
    setIsRecording(false);
    setIsModalOpen(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col items-center p-6 sm:p-12">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Voice Input</h1>
      <p className="text-gray-500 text-center mb-8 max-w-sm">
        Speak naturally and convert your voice to text instantly.
      </p>

      {/* Microphone Button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`flex items-center justify-center w-24 h-24 rounded-full shadow-lg transition-transform duration-200 ${
          isRecording ? "bg-red-500 hover:bg-red-600" : "bg-[#A3C4F3] hover:bg-[#91b8f7]"
        }`}
      >
        {isRecording ? (
          <StopCircle className="w-12 h-12 text-white" />
        ) : (
          <Mic className="w-12 h-12 text-white" />
        )}
      </button>

      {/* Live Transcription */}
      <div className="mt-8 w-full max-w-md p-4 border border-gray-200 rounded-xl bg-gray-50 min-h-[120px] flex items-center justify-center text-center text-gray-700 text-base sm:text-lg">
        {isRecording ? (transcript || "Listening...") : transcript || "Your transcription will appear here"}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-center">Transcribed Text</h2>
        <p className="text-gray-700 mb-4">{transcript}</p>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#A3C4F3] text-white font-semibold shadow hover:bg-[#91b8f7] transition"
        >
          {copied ? <Check className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </Modal>
    </div>
  );
}
