"use client";

import { useState, useRef, useEffect } from "react";
import {
  Brain,
  User,
  Sparkles,
  Send,
  Menu,
  Plus,
  MessageSquare,
  Trash2,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type ChatHistory = {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
};

const suggestions = [
  "Kapan korupsi di Indonesia akan selesai?",
  "Mengapa harga sembako terus naik?",
  "Bagaimana nasib pendidikan indonesia?",
  "Kapan infrastruktur bisa merata?",
];

export default function SuraChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const generateChatTitle = (firstMessage: string) => {
    return firstMessage.length > 30
      ? firstMessage.substring(0, 30) + "..."
      : firstMessage;
  };

  const saveCurrentChat = () => {
    if (messages.length === 0) return;

    const chatId = currentChatId || Date.now().toString();
    const title = generateChatTitle(messages[0]?.content || "Chat Baru");

    const chatData: ChatHistory = {
      id: chatId,
      title,
      messages: [...messages],
      lastUpdated: new Date(),
    };

    setChatHistory((prev) => {
      const existingIndex = prev.findIndex((chat) => chat.id === chatId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = chatData;
        return updated.sort(
          (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
        );
      } else {
        return [chatData, ...prev].sort(
          (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
        );
      }
    });

    if (!currentChatId) {
      setCurrentChatId(chatId);
    }
  };

  const loadChat = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setShowSuggestions(false);
      setSidebarOpen(false);
    }
  };

  const startNewChat = () => {
    saveCurrentChat();
    setMessages([]);
    setCurrentChatId(null);
    setShowSuggestions(true);
    setSidebarOpen(false);
  };

  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  async function handleSend(e: React.FormEvent, customQuestion?: string) {
    e.preventDefault();
    const question = customQuestion || input.trim();
    if (!question || loading) return;

    const newMessage: Message = {
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((msgs) => [...msgs, newMessage]);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch("/api/chat", {
        // ✅ Pakai internal API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ Tidak perlu X_CLIENT_KEY lagi karena internal
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal menghubungi server");
      }

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer || "Server tidak merespons dengan jawaban.",
        timestamp: new Date(),
      };

      setMessages((msgs) => {
        const updatedMessages = [...msgs, assistantMessage];
        setTimeout(() => saveCurrentChat(), 100);
        return updatedMessages;
      });
    } catch (error: any) {
      console.error("Error calling internal chat API:", error);

      const errorMessage: Message = {
        role: "assistant",
        content:
          error.message ||
          "Terjadi kesalahan saat menghubungi server. Silakan coba lagi.",
        timestamp: new Date(),
      };
      setMessages((msgs) => [...msgs, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSend(fakeEvent, suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatChatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const chatDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (chatDate.getTime() === today.getTime()) {
      return "Hari ini";
    } else if (chatDate.getTime() === yesterday.getTime()) {
      return "Kemarin";
    } else {
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });
    }
  };

  return (
    <div className="flex h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-black -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-800/5 via-transparent to-transparent -z-10"></div>

      {/* Mobile Sidebar Overlay - Only show on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed w-64 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col z-50`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-red-400/30 transition-all duration-200 group"
          >
            <Plus className="w-4 h-4 text-gray-300 group-hover:text-red-400" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white">
              Chat Baru
            </span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChat(chat.id)}
                className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 backdrop-blur-sm border ${
                  currentChatId === chat.id
                    ? "bg-red-600/20 border-red-400/30 text-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-red-400/20 text-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatChatDate(chat.lastUpdated)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded transition-all duration-200"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              </div>
            ))}

            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Belum ada riwayat chat</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">SURA AI</div>
              <div className="text-xs text-green-400">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex flex-col backdrop-blur-sm transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-0 md:ml-64" : "ml-0"
        } w-full h-screen`}
      >
        {/* Top Bar */}
        <div className="h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-200 relative flex-shrink-0"
            >
              <div className="relative">
                <Menu className="w-5 h-5" />
                {chatHistory.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </div>
            </button>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 truncate">
                  SURA AI
                </h1>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <div className="text-sm text-gray-400 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
              Suara Rakyat Indonesia
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Welcome Screen */}
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center p-4 sm:p-8">
              <div className="max-w-2xl mx-auto text-center w-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl"></div>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm shadow-2xl">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                    SURA AI
                  </span>
                </h2>

                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
                  Asisten AI yang memahami budaya dan bahasa Indonesia
                </p>

                {/* Suggestions */}
                {showSuggestions && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="group p-3 sm:p-4 text-left bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-red-400/30 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-red-500/10"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors">
                            {suggestion}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="max-w-4xl mx-auto w-full">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`border-b border-white/5 ${
                    msg.role === "assistant"
                      ? "bg-white/[0.02] backdrop-blur-xl"
                      : ""
                  }`}
                >
                  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex gap-3 sm:gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {msg.role === "assistant" ? (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                            <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          {msg.role === "assistant" ? "SURA AI" : "Anda"}
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-sm sm:text-base text-gray-100 leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 sm:mt-3">
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading Message */}
              {loading && (
                <div className="border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
                  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex gap-3 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                          <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          SURA AI
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-gray-400 text-xs sm:text-sm">
                            Sedang mengetik...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-black/20 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-4xl mx-auto p-4">
            <div className="relative">
              <div className="relative flex items-end gap-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 focus-within:border-red-400/30 focus-within:bg-white/10 transition-all duration-200 shadow-lg">
                <textarea
                  ref={textareaRef}
                  className="flex-1 resize-none bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none min-h-[52px] max-h-48 text-sm sm:text-base"
                  rows={1}
                  placeholder="Kirim pesan ke SURA AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  className={`m-2 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                    loading || !input.trim()
                      ? "text-gray-500 cursor-not-allowed bg-white/5"
                      : "text-white bg-red-600 hover:bg-red-700 hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  }`}
                  disabled={loading || !input.trim()}
                >
                  {loading ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-center mt-3 text-xs text-gray-500 px-4">
              SURA AI dapat membuat kesalahan. Verifikasi informasi penting.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
