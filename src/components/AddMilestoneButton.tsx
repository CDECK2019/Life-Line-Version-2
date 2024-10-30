import React from 'react';
import { Plus } from 'lucide-react';

interface AddMilestoneButtonProps {
  onClick: () => void;
  color: string;
}

export const AddMilestoneButton = ({ onClick, color }: AddMilestoneButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed right-6 bottom-6 bg-${color}-600 text-white p-4 rounded-full shadow-lg hover:bg-${color}-700 transition-colors z-40`}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};