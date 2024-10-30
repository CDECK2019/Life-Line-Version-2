import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

export const BirthYearInput = () => {
  const [year, setYear] = useState('');
  const setBirthYear = useStore((state) => state.setBirthYear);
  const birthYear = useStore((state) => state.birthYear);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedYear = parseInt(year);
    if (parsedYear && parsedYear > 1900 && parsedYear <= new Date().getFullYear()) {
      setBirthYear(parsedYear);
    }
  };

  if (birthYear) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Welcome to Life Line</h2>
        </div>
        <p className="text-gray-600 mb-6">
          To begin planning your life journey, please enter your birth year.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter birth year"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="1900"
            max={new Date().getFullYear()}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start My Journey
          </button>
        </form>
      </div>
    </div>
  );
};