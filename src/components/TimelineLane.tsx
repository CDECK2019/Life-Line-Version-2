import React from 'react';
import { TimelineView } from '../types/milestone';
import { useStore } from '../store/useStore';

interface TimelineLaneProps {
  type: TimelineView;
  color: string;
  expanded?: boolean;
}

const TimelineLabel = ({ type }: { type: TimelineView }) => {
  const birthYear = useStore((state) => state.birthYear);

  const getTimelineLabel = () => {
    switch (type) {
      case 'life':
        return birthYear ? `${birthYear} - ${birthYear + 100}` : '';
      case 'yearly':
        return new Date().getFullYear().toString();
      case 'monthly':
        return new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
      case 'weekly': {
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
      }
    }
  };

  return (
    <div className="text-sm text-gray-500 ml-auto">
      {getTimelineLabel()}
    </div>
  );
};

const TimelineLane = ({ type, color, expanded = false }: TimelineLaneProps) => {
  const milestones = useStore((state) => state.milestones);
  const birthYear = useStore((state) => state.birthYear);
  
  const getTimelinePosition = (date: Date): number => {
    const now = new Date();
    
    switch (type) {
      case 'life': {
        if (!birthYear) return 0;
        const lifeStart = new Date(birthYear, 0, 1);
        const lifeEnd = new Date(birthYear + 100, 0, 1);
        const totalDuration = lifeEnd.getTime() - lifeStart.getTime();
        const elapsed = date.getTime() - lifeStart.getTime();
        return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      }
      case 'yearly': {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
        const elapsed = date.getTime() - yearStart.getTime();
        const totalDuration = yearEnd.getTime() - yearStart.getTime();
        return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      }
      case 'monthly': {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const elapsed = date.getTime() - monthStart.getTime();
        const totalDuration = monthEnd.getTime() - monthStart.getTime();
        return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      }
      case 'weekly': {
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        const elapsed = date.getTime() - weekStart.getTime();
        const totalDuration = weekEnd.getTime() - weekStart.getTime();
        return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      }
    }
  };

  const filteredMilestones = milestones.filter((m) => {
    const date = new Date(m.date);
    const now = new Date();
    
    switch (type) {
      case 'life':
        return true;
      case 'yearly':
        return date.getFullYear() === now.getFullYear();
      case 'monthly':
        return (
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()
        );
      case 'weekly': {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return date >= weekStart && date <= weekEnd;
      }
    }
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={`relative ${expanded ? 'h-96' : 'h-24'}`}>
      <div className={`absolute inset-x-0 h-1 bg-${color}-100 top-1/2 -translate-y-1/2 rounded-full`}>
        <div className={`absolute inset-0 h-full bg-${color}-500 rounded-full`} />
        {filteredMilestones.map((milestone, index) => {
          const position = getTimelinePosition(new Date(milestone.date));
          return (
            <div
              key={milestone.id}
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-${color}-500 hover:ring-4 hover:ring-${color}-200 cursor-pointer transition-all`}
              style={{ left: `${position}%` }}
            >
              {expanded && (
                <div className={`absolute ${index % 2 === 0 ? 'bottom-6' : 'top-6'} left-1/2 -translate-x-1/2 w-max`}>
                  <div className={`bg-${color}-50 rounded-lg p-3 shadow-sm`}>
                    <p className="text-sm font-medium text-gray-900">{milestone.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(milestone.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

TimelineLane.TimelineLabel = TimelineLabel;

export { TimelineLane };