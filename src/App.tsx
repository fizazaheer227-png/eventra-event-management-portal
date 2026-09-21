import React, { useState } from 'react';
import { EventProvider, useEvents } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { RegistrationModal } from './components/RegistrationModal';
import { TicketModal } from './components/TicketModal';

import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { EventDetailsView } from './views/EventDetailsView';
import { MyEventsView } from './views/MyEventsView';
import { CreateEventView } from './views/CreateEventView';
import { ProfileView } from './views/ProfileView';
import { EventItem } from './types';

const MainContent: React.FC = () => {
  const { currentView, activeTicket, setActiveTicket } = useEvents();

  // Registration modal state
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [selectedRegEvent, setSelectedRegEvent] = useState<EventItem | null>(null);

  const handleOpenRegistration = (event: EventItem) => {
    setSelectedRegEvent(event);
    setIsRegModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegModalOpen(false);
    setSelectedRegEvent(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-slate-900">
      {/* Top Navbar */}
      <Navbar />

      {/* View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView onRegisterClick={handleOpenRegistration} />
        )}
        {currentView === 'explore' && (
          <ExploreView onRegisterClick={handleOpenRegistration} />
        )}
        {currentView === 'details' && (
          <EventDetailsView onRegisterClick={handleOpenRegistration} />
        )}
        {currentView === 'my-events' && (
          <MyEventsView />
        )}
        {(currentView === 'create' || currentView === 'edit') && (
          <CreateEventView />
        )}
        {currentView === 'profile' && (
          <ProfileView />
        )}
      </main>

      {/* Global Modals */}
      <RegistrationModal
        isOpen={isRegModalOpen}
        event={selectedRegEvent}
        onClose={handleCloseRegistration}
      />

      <TicketModal
        registration={activeTicket}
        onClose={() => setActiveTicket(null)}
      />

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <EventProvider>
      <MainContent />
    </EventProvider>
  );
}
