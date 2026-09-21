import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventItem, Registration, UserProfile, Toast, ViewType, EventCategory } from '../types';
import { INITIAL_EVENTS, INITIAL_REGISTRATIONS, INITIAL_USER_PROFILE } from '../data/initialData';

const STORAGE_KEYS = {
  EVENTS: 'eventra_events_v1',
  REGISTRATIONS: 'eventra_registrations_v1',
  PROFILE: 'eventra_profile_v1',
};

interface EventContextType {
  events: EventItem[];
  registrations: Registration[];
  userProfile: UserProfile;
  currentView: ViewType;
  selectedEventId: string | null;
  editingEventId: string | null;
  searchQuery: string;
  selectedCategory: string;
  toasts: Toast[];
  activeTicket: Registration | null;
  
  // Navigation
  navigateTo: (view: ViewType, eventId?: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setActiveTicket: (ticket: Registration | null) => void;
  
  // Event operations
  addEvent: (eventData: Omit<EventItem, 'id' | 'availableSeats' | 'isCreatedByUser'>) => EventItem;
  updateEvent: (id: string, updatedData: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  
  // Registration operations
  registerForEvent: (
    eventId: string,
    attendee: { fullName: string; email: string; phoneNumber: string; organization?: string }
  ) => { success: boolean; error?: string; registration?: Registration };
  cancelRegistration: (registrationId: string) => void;
  isUserRegisteredForEvent: (eventId: string) => boolean;
  getEventRegistration: (eventId: string) => Registration | undefined;
  
  // Profile operations
  updateUserProfile: (updated: Partial<UserProfile>) => void;
  resetAllData: () => void;
  
  // Toasts
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Events from localStorage or defaults
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load events from storage:', e);
    }
    return INITIAL_EVENTS;
  });

  // 2. Initialize Registrations
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load registrations from storage:', e);
    }
    return INITIAL_REGISTRATIONS;
  });

  // 3. Initialize Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load profile from storage:', e);
    }
    return INITIAL_USER_PROFILE;
  });

  // UI state
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeTicket, setActiveTicket] = useState<Registration | null>(null);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Failed to persist events:', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error('Failed to persist registrations:', e);
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to persist profile:', e);
    }
  }, [userProfile]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (view: ViewType, eventId: string | null = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (eventId) {
      if (view === 'edit') {
        setEditingEventId(eventId);
      } else {
        setSelectedEventId(eventId);
      }
    } else {
      if (view !== 'details') setSelectedEventId(null);
      if (view !== 'edit') setEditingEventId(null);
    }
  };

  // Check if user is registered for an event
  const isUserRegisteredForEvent = (eventId: string): boolean => {
    return registrations.some(r => r.eventId === eventId && r.status === 'confirmed');
  };

  const getEventRegistration = (eventId: string): Registration | undefined => {
    return registrations.find(r => r.eventId === eventId && r.status === 'confirmed');
  };

  // Register for Event
  const registerForEvent = (
    eventId: string,
    attendee: { fullName: string; email: string; phoneNumber: string; organization?: string }
  ) => {
    const targetEvent = events.find(e => e.id === eventId);
    if (!targetEvent) {
      return { success: false, error: 'Event not found.' };
    }

    if (isUserRegisteredForEvent(eventId)) {
      return { success: false, error: 'You have already registered for this event.' };
    }

    if (targetEvent.availableSeats <= 0) {
      return { success: false, error: 'Sorry, this event is already sold out.' };
    }

    const ticketNumber = 'EVT-' + Math.floor(10000 + Math.random() * 90000);
    const newRegistration: Registration = {
      id: 'reg-' + Date.now(),
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      eventDate: targetEvent.date,
      eventTime: `${targetEvent.startTime} - ${targetEvent.endTime}`,
      eventVenue: targetEvent.venue,
      eventLocation: targetEvent.location,
      eventImageUrl: targetEvent.imageUrl,
      eventCategory: targetEvent.category,
      fullName: attendee.fullName.trim(),
      email: attendee.email.trim(),
      phoneNumber: attendee.phoneNumber.trim(),
      organization: attendee.organization?.trim() || '',
      registeredAt: new Date().toISOString(),
      ticketId: ticketNumber,
      status: 'confirmed',
    };

    // 1. Decrement available seats in event
    setEvents(prev =>
      prev.map(evt =>
        evt.id === eventId
          ? { ...evt, availableSeats: Math.max(0, evt.availableSeats - 1) }
          : evt
      )
    );

    // 2. Append registration
    setRegistrations(prev => [newRegistration, ...prev]);

    showToast(`Registration confirmed for "${targetEvent.title}"!`, 'success');
    return { success: true, registration: newRegistration };
  };

  // Cancel Registration
  const cancelRegistration = (registrationId: string) => {
    const targetReg = registrations.find(r => r.id === registrationId);
    if (!targetReg) return;

    // Restore available seat to event
    setEvents(prev =>
      prev.map(evt =>
        evt.id === targetReg.eventId
          ? { ...evt, availableSeats: Math.min(evt.maxParticipants, evt.availableSeats + 1) }
          : evt
      )
    );

    // Remove registration
    setRegistrations(prev => prev.filter(r => r.id !== registrationId));
    showToast(`Registration for "${targetReg.eventTitle}" was cancelled.`, 'info');
  };

  // Add Event
  const addEvent = (eventData: Omit<EventItem, 'id' | 'availableSeats' | 'isCreatedByUser'>): EventItem => {
    const newId = 'evt-custom-' + Date.now();
    const newEvent: EventItem = {
      ...eventData,
      id: newId,
      availableSeats: eventData.maxParticipants,
      isCreatedByUser: true,
      price: eventData.price || 'Free',
    };

    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published successfully!`, 'success');
    return newEvent;
  };

  // Update Event
  const updateEvent = (id: string, updatedData: Partial<EventItem>) => {
    setEvents(prev =>
      prev.map(evt => {
        if (evt.id === id) {
          const updated = { ...evt, ...updatedData };
          // Keep available seats bounded
          if (updatedData.maxParticipants !== undefined) {
            const registeredCount = evt.maxParticipants - evt.availableSeats;
            updated.availableSeats = Math.max(0, updated.maxParticipants - registeredCount);
          }
          return updated;
        }
        return evt;
      })
    );
    showToast('Event updated successfully.', 'success');
  };

  // Delete Event
  const deleteEvent = (id: string) => {
    const targetEvent = events.find(e => e.id === id);
    if (!targetEvent) return;

    setEvents(prev => prev.filter(e => e.id !== id));
    // Remove associated registrations as well
    setRegistrations(prev => prev.filter(r => r.eventId !== id));
    showToast(`Event "${targetEvent.title}" has been deleted.`, 'info');

    if (selectedEventId === id) {
      setSelectedEventId(null);
      setCurrentView('explore');
    }
  };

  // Update User Profile
  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
    showToast('Profile updated successfully!', 'success');
  };

  // Reset to initial sample data
  const resetAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
      localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
    } catch (e) {
      console.error(e);
    }
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setUserProfile(INITIAL_USER_PROFILE);
    showToast('Eventra data reset to initial sample set.', 'info');
  };

  return (
    <EventContext.Provider
      value={{
        events,
        registrations,
        userProfile,
        currentView,
        selectedEventId,
        editingEventId,
        searchQuery,
        selectedCategory,
        toasts,
        activeTicket,
        navigateTo,
        setSearchQuery,
        setSelectedCategory,
        setActiveTicket,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        cancelRegistration,
        isUserRegisteredForEvent,
        getEventRegistration,
        updateUserProfile,
        resetAllData,
        showToast,
        removeToast,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
