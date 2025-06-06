
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

interface User {
  id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface ChatAreaProps {
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
}

const ChatArea = ({ messages, currentUser, onSendMessage }: ChatAreaProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">#</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-slate-900">General</h2>
            <p className="text-sm text-slate-500">{messages.filter(m => m.type !== 'system').length} messages</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === currentUser.id;
          const isSystem = message.type === 'system';
          const showAvatar = !isOwn && !isSystem && (index === 0 || messages[index - 1].senderId !== message.senderId);
          
          if (isSystem) {
            return (
              <div key={message.id} className="flex justify-center">
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {message.content}
                </div>
              </div>
            );
          }

          return (
            <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} space-x-2 max-w-xs lg:max-w-md`}>
                {showAvatar && !isOwn && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-medium">
                      {message.senderName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                {!showAvatar && !isOwn && <div className="w-8" />}
                
                <div className={`${isOwn ? 'mr-2' : 'ml-2'}`}>
                  {showAvatar && !isOwn && (
                    <p className="text-xs font-medium text-slate-700 mb-1 ml-1">
                      {message.senderName}
                    </p>
                  )}
                  <div
                    className={`
                      px-4 py-2 rounded-2xl break-words
                      ${isOwn 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-slate-100 text-slate-900'
                      }
                    `}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-slate-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-slate-50">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 h-12 rounded-full bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
