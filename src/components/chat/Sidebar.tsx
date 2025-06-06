
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, MessageCircle, X } from 'lucide-react';

interface User {
  id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
}

interface SidebarProps {
  users: User[];
  currentUser: User;
  onLogout: () => void;
  onClose: () => void;
}

const Sidebar = ({ users, currentUser, onLogout, onClose }: SidebarProps) => {
  const onlineUsers = users.filter(user => user.isOnline);
  const offlineUsers = users.filter(user => !user.isOnline);

  return (
    <div className="h-full bg-white shadow-xl border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">ChatApp</h1>
              <p className="text-blue-100 text-sm">{onlineUsers.length} online</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Current User */}
      <div className="p-4 border-b bg-slate-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                {currentUser.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{currentUser.username}</p>
            <p className="text-xs text-green-600 font-medium">Online</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="text-slate-500 hover:text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <div className="p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Online — {onlineUsers.length}
            </h3>
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-medium">
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user.username}
                      {user.id === currentUser.id && (
                        <span className="text-xs text-slate-500 ml-1">(You)</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offline Users */}
        {offlineUsers.length > 0 && (
          <div className="p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Offline — {offlineUsers.length}
            </h3>
            <div className="space-y-2">
              {offlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg opacity-60">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-300 text-slate-600 text-sm font-medium">
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-slate-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-600 truncate">{user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
