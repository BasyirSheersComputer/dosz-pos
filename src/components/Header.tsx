import React from 'react';
import { Coffee, Clock, User, Settings, LogOut } from 'lucide-react';
import { Staff } from '../types';

interface HeaderProps {
  currentStaff: Staff;
  currentTime: string;
  onLogout: () => void;
  onSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentStaff, 
  currentTime, 
  onLogout, 
  onSettings 
}) => {
  return (
    <header className="bg-primary text-white shadow-lg h-20 flex-shrink-0">
      <div className="h-full flex items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Coffee className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Dosz Coffee</h1>
            <p className="text-primary-light text-sm">Point of Sale System</p>
          </div>
        </div>

        {/* Center - Time */}
        <div className="flex items-center space-x-3 bg-primary-dark px-6 py-3 rounded-xl shadow-sm">
          <Clock className="h-6 w-6" />
          <span className="text-xl font-mono font-semibold">{currentTime}</span>
        </div>

        {/* Staff Info and Actions */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-dark p-3 rounded-full shadow-sm">
              <User className="h-7 w-7" />
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">{currentStaff.name}</p>
              <p className="text-primary-light text-sm capitalize">{currentStaff.role}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onSettings}
              className="p-3 hover:bg-primary-dark rounded-xl transition-colors shadow-sm"
              title="Settings"
            >
              <Settings className="h-6 w-6" />
            </button>
            <button
              onClick={onLogout}
              className="p-3 hover:bg-red-600 rounded-xl transition-colors shadow-sm"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;