import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { Registration, EventItem } from '../types';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  Trash2, 
  ExternalLink, 
  PlusCircle, 
  Search, 
  AlertCircle,
  Edit3,
  Users,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const MyEventsView: React.FC = () => {
  const { 
    registrations, 
    events, 
    cancelRegistration, 
    deleteEvent, 
    navigateTo, 
    setActiveTicket 
  } = useEvents();

  const [activeTab, setActiveTab] = useState<'registered' | 'created'>('registered');
  const [cancellingRegistration, setCancellingRegistration] = useState<Registration | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<EventItem | null>(null);

  // User's registered events
  const registeredEvents = registrations.filter(r => r.status === 'confirmed');

  // User's created events
  const createdEvents = events.filter(e => e.isCreatedByUser);

  const handleCancelConfirm = () => {
    if (cancellingRegistration) {
      cancelRegistration(cancellingRegistration.id);
      setCancellingRegistration(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingEvent) {
      deleteEvent(deletingEvent.id);
      setDeletingEvent(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/60 mb-2">
            <BookmarkCheck className="w-3.5 h-3.5" />
            Your Event Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            My Events & Passes
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Access your confirmed admission tickets, manage registrations, or supervise events you've organized.
          </p>
        </div>

        <button
          id="my-events-host-btn"
          type="button"
          onClick={() => navigateTo('create')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-xs shadow-orange-600/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Host New Event</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          id="tab-registered-events"
          type="button"
          onClick={() => setActiveTab('registered')}
          className={`pb-3.5 px-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'registered'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Registered Events</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
            {registeredEvents.length}
          </span>
        </button>

        <button
          id="tab-created-events"
          type="button"
          onClick={() => setActiveTab('created')}
          className={`pb-3.5 px-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'created'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Events I Created</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
            {createdEvents.length}
          </span>
        </button>
      </div>

      {/* CONTENT: REGISTERED EVENTS */}
      {activeTab === 'registered' && (
        <div>
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map(reg => {
                const eventDetails = events.find(e => e.id === reg.eventId);
                const eventDateFormatted = new Date(reg.eventDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <div
                    key={reg.id}
                    id={`registered-card-${reg.id}`}
                    className="bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    {/* Top strip with image and ticket ID */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <img
                        src={reg.eventImageUrl}
                        alt={reg.eventTitle}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                      {/* Ticket Tag Pill */}
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-mono font-bold px-3 py-1 rounded-xl border border-white/20 flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-orange-400" />
                        {reg.ticketId}
                      </div>

                      <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmed
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[11px] text-orange-300 font-semibold uppercase tracking-wider block">
                          {reg.eventCategory}
                        </span>
                        <h3 className="text-base font-bold font-heading truncate drop-shadow-sm">
                          {reg.eventTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                          <span className="font-semibold text-slate-800">{eventDateFormatted}</span>
                          <span>•</span>
                          <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{reg.eventTime}</span>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="truncate">{reg.eventVenue}, {reg.eventLocation}</span>
                        </div>
                      </div>

                      {/* Attendee preview */}
                      <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 flex items-center justify-between border border-stone-100">
                        <div>
                          <span className="text-[10px] text-stone-400 block uppercase font-semibold">Attendee</span>
                          <span className="font-semibold text-slate-800">{reg.fullName}</span>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          Registered {new Date(reg.registeredAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            id={`view-pass-btn-${reg.id}`}
                            type="button"
                            onClick={() => setActiveTicket(reg)}
                            className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-xs shadow-orange-600/20 transition-colors flex items-center gap-1.5"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                            View Digital Pass
                          </button>

                          <button
                            id={`details-link-${reg.id}`}
                            type="button"
                            onClick={() => navigateTo('details', reg.eventId)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Details
                          </button>
                        </div>

                        <button
                          id={`cancel-reg-${reg.id}`}
                          type="button"
                          onClick={() => setCancellingRegistration(reg)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          title="Cancel Registration"
                          aria-label="Cancel Registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-6">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                No active event registrations yet
              </h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto mt-1">
                Explore tech summits, concerts, and workshops to claim your spot and get verified digital passes.
              </p>
              <button
                id="empty-explore-btn"
                type="button"
                onClick={() => navigateTo('explore')}
                className="mt-5 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-xs shadow-orange-600/20 transition-colors inline-flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Browse Events Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* CONTENT: CREATED EVENTS */}
      {activeTab === 'created' && (
        <div>
          {createdEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {createdEvents.map(evt => {
                const registeredCount = evt.maxParticipants - evt.availableSeats;
                return (
                  <div
                    key={evt.id}
                    id={`created-event-card-${evt.id}`}
                    className="bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <img
                        src={evt.imageUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                      <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Host: You
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {evt.category}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-base font-bold font-heading truncate drop-shadow-sm">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          {evt.venue}, {evt.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      {/* Attendance stats */}
                      <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase font-bold">Registrations</span>
                          <span className="text-base font-extrabold text-slate-900">{registeredCount} attendees</span>
                        </div>
                        <div className="text-right">
                          <span className="text-stone-400 block text-[10px] uppercase font-bold">Seats Left</span>
                          <span className="text-sm font-bold text-orange-600">{evt.availableSeats} of {evt.maxParticipants}</span>
                        </div>
                      </div>

                      {/* Management Buttons */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <button
                          id={`preview-event-${evt.id}`}
                          type="button"
                          onClick={() => navigateTo('details', evt.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Public Page
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            id={`edit-created-event-${evt.id}`}
                            type="button"
                            onClick={() => navigateTo('edit', evt.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Edit
                          </button>

                          <button
                            id={`delete-created-event-${evt.id}`}
                            type="button"
                            onClick={() => setDeletingEvent(evt)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="Delete Event"
                            aria-label="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-6">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <PlusCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                You haven't hosted any events yet
              </h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto mt-1">
                Have a workshop, meetup, or hackathon in mind? Publish your event and start collecting registrations in minutes.
              </p>
              <button
                id="empty-host-event-btn"
                type="button"
                onClick={() => navigateTo('create')}
                className="mt-5 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-xs shadow-orange-600/20 transition-colors inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Create Your First Event
              </button>
            </div>
          )}
        </div>
      )}

      {/* Cancel Registration Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!cancellingRegistration}
        title="Cancel Registration"
        message={`Are you sure you want to cancel your ticket for "${cancellingRegistration?.eventTitle}"? This will release your seat to other participants.`}
        confirmLabel="Yes, Cancel"
        confirmVariant="danger"
        onConfirm={handleCancelConfirm}
        onCancel={() => setCancellingRegistration(null)}
      />

      {/* Delete Event Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deletingEvent}
        title="Delete Event"
        message={`Are you sure you want to delete "${deletingEvent?.title}"? This cannot be undone and will cancel all attendee registrations for this event.`}
        confirmLabel="Yes, Delete Permanently"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingEvent(null)}
      />
    </div>
  );
};
