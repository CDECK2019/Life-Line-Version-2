import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BirthYearInput } from './components/BirthYearInput';
import { TimelineHeader } from './components/TimelineHeader';
import { TimelineOverview } from './components/TimelineOverview';
import { SingleTimelineView } from './components/SingleTimelineView';
import { Auth } from './components/Auth';
import { useStore } from './store/useStore';

function App() {
  const { birthYear, isLoading, initializeStore, userId } = useStore();

  useEffect(() => {
    initializeStore();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!userId) {
    return <Auth />;
  }

  if (!birthYear) {
    return <BirthYearInput />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <TimelineHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<TimelineOverview />} />
            <Route path="/timeline/:view" element={<SingleTimelineView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;