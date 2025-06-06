
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

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

interface ChatLayoutProps {
  currentUser: User;
  onLogout: () => void;
}

const ChatLayout = ({ currentUser, onLogout }: ChatLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Initialize with current user and some mock users
    const mockUsers: User[] = [
      currentUser,
      { id: '1', username: 'Alice', isOnline: true },
      { id: '2', username: 'Bob', isOnline: true },
      { id: '3', username: 'Charlie', isOnline: false },
      { id: '4', username: 'Diana', isOnline: true },
    ];
    setUsers(mockUsers);

    // Add welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      senderId: 'system',
      senderName: 'System',
      content: `Welcome to ChatApp, ${currentUser.username}!`,
      timestamp: new Date(),
      type: 'system',
    };
    setMessages([welcomeMessage]);

    // Simulate receiving messages periodically
    const interval = setInterval(() => {
      const senders = mockUsers.filter(u => u.id !== currentUser.id && u.isOnline);
      if (senders.length > 0) {
        const randomSender = senders[Math.floor(Math.random() * senders.length)];
        const sampleMessages = [
          'Hey everyone! 👋',
          'How are you doing today?',
          'Anyone working on something interesting?',
          'The weather is great today!',
          'Just finished a great project 🎉',
          'Coffee break time! ☕',
          'What\'s everyone up to?',
        ];
        
        const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: randomSender.id,
          senderName: randomSender.username,
          content: randomMessage,
          timestamp: new Date(),
          type: 'text',
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.username,
      content,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          users={users} 
          currentUser={currentUser} 
          onLogout={onLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="mr-3"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">ChatApp</h1>
        </div>

        <ChatArea 
          messages={messages} 
          currentUser={currentUser} 
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatLayout;
