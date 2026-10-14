import { useState, useEffect } from 'react';
import { getSocket } from './useSocket';
import { ChatMessagePayload } from '../types/socket';

export const useChat = (room: string, userId: string, isAdmin = false) => {
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.emit('chat:join', room);

    const handleIncomingMessage = (msg: ChatMessagePayload) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('chat:received', handleIncomingMessage);

    return () => {
      socket.off('chat:received', handleIncomingMessage);
    };
  }, [room]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const socket = getSocket();
    socket.emit('chat:send', { room, text, userId, isAdmin });
  };

  return { messages, sendMessage };
};