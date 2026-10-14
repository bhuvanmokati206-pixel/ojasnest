import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useAuthStore } from '../../context/useAuthStore';
import { useChat } from '../../hooks/useChat';
import { ChatMessageList } from './ChatMessageList';

export const LiveChatModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const user = useAuthStore((s) => s.user);

  const room = user ? `support_${user.id}` : 'guest_room';
  const { messages, sendMessage } = useChat(room, user?.id || 'guest', user?.role === 'ADMIN');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-amber-400 hover:bg-amber-500 text-slate-950 p-3.5 rounded-full shadow-2xl transition-transform hover:scale-105"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Ojasnest Live Support
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-xs">Close</button>
          </div>
          <ChatMessageList messages={messages || []} currentUserId={user?.id || 'guest'} />
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask an agent..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button type="submit" className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};