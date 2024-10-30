import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TimelineView } from '../types/milestone';
import { TimelineLane } from './TimelineLane';
import { AddMilestoneButton } from './AddMilestoneButton';
import { MilestoneModal } from './MilestoneModal';

export const SingleTimelineView = () => {
  const { view } = useParams<{ view: TimelineView }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTimelineTitle = (view: TimelineView) => {
    switch (view) {
      case 'life':
        return 'Life Journey';
      case 'yearly':
        return 'Year at a Glance';
      case 'monthly':
        return 'Monthly Overview';
      case 'weekly':
        return 'Weekly Schedule';
      default:
        return '';
    }
  };

  const getTimelineColor = (view: TimelineView) => {
    switch (view) {
      case 'life':
        return 'indigo';
      case 'yearly':
        return 'emerald';
      case 'monthly':
        return 'amber';
      case 'weekly':
        return 'rose';
      default:
        return 'gray';
    }
  };

  if (!view) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{getTimelineTitle(view)}</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8">
        <TimelineLane type={view} color={getTimelineColor(view)} expanded />
      </div>
      <AddMilestoneButton
        onClick={() => setIsModalOpen(true)}
        color={getTimelineColor(view)}
      />
      <MilestoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        timelineType={view}
      />
    </div>
  );
};