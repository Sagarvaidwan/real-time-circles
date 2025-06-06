
import { useState, useEffect } from 'react';
import ChatLayout from '../components/chat/ChatLayout';
import AuthForm from '../components/auth/AuthForm';

interface User {
  id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in (simulate persistence)
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    const user: User = {
      id: Date.now().toString(),
      username,
      isOnline: true,
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('chatUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('chatUser');
  };

  if (!isAuthenticated || !currentUser) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return <ChatLayout currentUser={currentUser} onLogout={handleLogout} />;
};

export default Index;
