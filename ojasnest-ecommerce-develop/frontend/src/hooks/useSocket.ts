import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socketInstance;
};

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>(getSocket());

  useEffect(() => {
    const s = getSocket();
    if (!s.connected) {
      s.connect();
    }
    setSocket(s);
  }, []);

  return socket;
};