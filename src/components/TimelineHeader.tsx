import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GitBranch, CalendarDays, CalendarCheck, Calendar, LogOut } from 'lucide-react';
import { TimelineView } from '../types/milestone';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';

export const TimelineHeader = () => {
  const location = useLocation();
  const currentView = location.pathname.split('/').pop() as TimelineView | undefined;
  const { initializeStore } = useStore();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    initializeStore();
  };

  const views: { type: TimelineView; icon: React.ReactNode; label: string }[] = [
    { type: 'life', icon: <GitBranch className="w-5 h-5" />, label: 'Life' },
    { type: 'yearly', icon: <Calendar className="w-5 h-5" />, label: 'Yearly' },
    { type: 'monthly', icon: <CalendarDays className="w-5 h-5" />, label: 'Monthly' },
    { type: 'weekly', icon: <CalendarCheck className="w-5 h-5" />, label: 'Weekly' },
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">Life Line</span>
          </Link>
          <div className="flex items-center space-x-1">
            {views.map(({ type, icon, label }) => (
              <Link
                key={type}
                to={`/timeline/${type}`}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  currentView === type
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="ml-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};