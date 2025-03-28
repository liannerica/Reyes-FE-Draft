
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Artwork, ChatMessage } from '../data/artworks';

interface AuctionChatProps {
  artwork: Artwork;
  onSendMessage: (message: string) => void;
}

const AuctionChat: React.FC<AuctionChatProps> = ({ artwork, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [artwork.chat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col border border-gallery-border rounded-lg bg-white shadow-subtle">
      <div className="p-4 border-b border-gallery-border">
        <h3 className="font-display text-lg font-medium">Auction Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {artwork.chat.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gallery-text/50 text-sm italic">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          artwork.chat.map((chatMessage) => (
            <div key={chatMessage.id}>
              <div className="chat-message chat-message-other">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{chatMessage.userName}</span>
                  <span className="text-xs text-gallery-text/60">{formatTime(chatMessage.timestamp)}</span>
                </div>
                <p className="text-sm">{chatMessage.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-gallery-border">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm rounded-md border border-gallery-border focus:outline-none focus:ring-1 focus:ring-gallery-accent"
          />
          <button 
            type="submit"
            className="rounded-md bg-gallery-accent/90 hover:bg-gallery-accent text-white p-2 transition-colors duration-300"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuctionChat;
