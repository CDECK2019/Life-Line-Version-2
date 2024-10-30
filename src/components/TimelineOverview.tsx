import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Calendar, CalendarDays, CalendarCheck } from 'lucide-react';
import { TimelineView } from '../types/milestone';
import { TimelineLane } from './TimelineLane';
import { MilestoneModal } from './MilestoneModal';

export const TimelineOverview = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimelineType, setSelectedTimelineType] = useState<TimelineView>('life');

  const timelineConfigs: {
    type: TimelineView;
    icon: React.ReactNode;
    label: string;
    color: string;
  }[] = [
    {
      type: 'life',
      icon: <GitBranch className="w-6 h-6" />,
      label: 'Life Timeline',
      color: 'indigo',
    },
    {
      type: 'yearly',
      icon: <Calendar className="w-6 h-6" />,
      label: 'Yearly Goals',
      color: 'emerald',
    },
    {
      type: 'monthly',
      icon: <CalendarDays className="w-6 h-6" />,
      label: 'Monthly Objectives',
      color: 'amber',
    },
    {
      type: 'weekly',
      icon: <CalendarCheck className="w-6 h-6" />,
      label: 'Weekly Tasks',
      color: 'rose',
    },
  ];

  const handleTimelineClick = (type: TimelineView) => {
    setSelectedTimelineType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {timelineConfigs.map(({ type, icon, label, color }) => (
        <div
          key={type}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`text-${color}-600`}>{icon}</div>
              <h2 className="text-xl font-semibold text-gray-900">{label}</h2>
              <TimelineLane.TimelineLabel type={type} />
            </div>
          </div>
          <div 
            className="cursor-pointer"
            onClick={() => navigate(`/timeline/${type}`)}
          >
            <TimelineLane type={type} color={color} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTimelineClick(type);
            }}
            className={`mt-4 px-4 py-2 text-${color}-600 border border-${color}-600 rounded-lg hover:bg-${color}-50 transition-colors`}
          >
            Add Milestone
          </button>
        </div>
      ))}
      <MilestoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        timelineType={selectedTimelineType}
      />
    </div>
  );
};