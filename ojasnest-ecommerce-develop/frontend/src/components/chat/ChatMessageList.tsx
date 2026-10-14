import React from 'react';
import { ChatMessagePayload } from '../../types/socket';

export const ChatMessageList: React.FC<{ messages: ChatMessagePayload[]; currentUserId: string }> = ({ messages, currentUserId }) => (
  <div className="space-y-3 h-72 overflow-y-auto p-4 bg-slate-950 rounded-lg border border-slate-800">
    {messages.map((m, idx) => {
      const isMe = m.user?.id === currentUserId;
      return (
        <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-xs px-3 py-2 rounded-lg text-xs ${isMe ? 'bg-amber-400 text-slate-950 font-medium' : 'bg-slate-800 text-slate-200'}`}>
            <span className="block font-bold text-[10px] opacity-70 mb-0.5">{m.user?.name || (m.isAdmin ? 'Ojas Support' : 'User')}</span>
            {m.text}
          </div>
        </div>
      );
    })}
  </div>
);