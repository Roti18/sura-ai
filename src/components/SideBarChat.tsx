"use client";

import { Brain, Plus, MessageSquare, Trash2, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

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

interface SidebarChatProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  chatHistory: ChatHistory[];
  currentChatId: string | null;
  startNewChat: () => void;
  loadChat: (chatId: string) => void;
  deleteChat: (chatId: string, e: React.MouseEvent) => void;
}

export default function SidebarChat({
  sidebarOpen,
  setSidebarOpen,
  chatHistory,
  currentChatId,
  startNewChat,
  loadChat,
  deleteChat,
}: SidebarChatProps) {
  const { data: session } = useSession();

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
    <>
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

        {/* Sidebar Header - New Chat Button */}
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

        {/* User Profile Section */}
        {session?.user && (
          <div className="p-4 border-b border-white/10">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-12 h-12 rounded-full border-2 border-red-500/40 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-2 border-red-500/40">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 font-medium px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm border border-red-500/20 hover:border-red-500/40"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
