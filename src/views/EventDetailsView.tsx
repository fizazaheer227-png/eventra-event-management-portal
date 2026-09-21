import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { EventItem } from '../types';
import { CATEGORY_METADATA } from '../data/initialData';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Share2, 
  Ticket, 
  Building, 
  Mail, 
  Check, 
  AlertCircle,
  Tag,
  ShieldCheck,
  Edit3,
  Trash2
} from 'lucide-react';
import { ConfirmationModal } from '../components/ConfirmationModal';

interface EventDetailsViewProps {
  onRegisterClick: (event: EventItem) => void;
}

export const EventDetailsView: React.FC<EventDetailsViewProps> = ({ onRegisterClick }) => {
  const { 
    events, 
    selectedEventId, 
    navigateTo, 
    isUserRegisteredForEvent, 
    getEventRegistration,
    cancelRegistration,
    deleteEvent,
    setActiveTicket,
    showToast 
  } = useEvents();

  const [copiedLink, setCopiedLink] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const event = events.find(e => e.id === selectedEventId) || events[0];

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <p className="text-slate-500 mt-2">The event you are looking for may have been removed.</p>
        <button
          type="button"
          onClick={() => navigateTo('explore')}
          className="mt-6 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  const isRegistered = isUserRegisteredForEvent(event.id);
  const registration = getEventRegistration(event.id);
  const isSoldOut = event.availableSeats <= 0;
  const categoryMeta = CATEGORY_METADATA[event.category] || {
    label: event.category,
    color: 'text-stone-800',
    bg: 'bg-stone-100',
    border: 'border-stone-200'
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Event link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCancelRegistrationConfirm = () => {
    if (registration) {
      cancelRegistration(registration.id);
      setShowCancelModal(false);
    }
  };

  const handleDeleteEventConfirm = () => {
    deleteEvent(event.id);
    setShowDeleteModal(false);
  };

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-explore-btn"
          type="button"
          onClick={() => navigateTo('explore')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </button>

        <div className="flex items-center gap-2">
          {event.isCreatedByUser && (
            <>
              <button
                id="edit-event-btn"
                type="button"
                onClick={() => navigateTo('edit', event.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl border border-orange-200 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Event
              </button>
              <button
                id="delete-event-btn"
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl border border-rose-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </>
          )}

          <button
            id="share-event-btn"
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Large Event Banner */}
      <div className="relative w-full h-72 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden shadow-xl bg-slate-900 border border-stone-200/90">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/20" />

        {/* Floating Badges */}
        <div className="absolute top-6 left-6 flex items-center gap-2 flex-wrap">
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-white/95 ${categoryMeta.color} shadow-md`}>
            {event.category}
          </span>
          {event.isFeatured && (
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
              Featured Experience
            </span>
          )}
          {isRegistered && (
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Registered Attendee
            </span>
          )}
        </div>

        {/* Title and location inside banner */}
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
          <div className="flex items-center gap-2 text-orange-300 text-xs font-semibold mb-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight leading-tight drop-shadow-md">
            {event.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-200 flex items-center gap-1.5 drop-shadow-sm">
            <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{event.venue}, {event.location}</span>
          </p>
        </div>
      </div>

      {/* Main Content Grid: Left 2 Cols (Details, Agenda, Organizer), Right 1 Col (Registration Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Full Details & Agenda */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About This Event */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
            <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
              About This Event
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {event.description}
            </p>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-stone-400" />
                {event.tags.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Agenda & Schedule (if available) */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
              <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Event Schedule & Agenda
              </h2>

              <div className="space-y-4">
                {event.agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-100"
                  >
                    <div className="w-24 shrink-0 text-xs font-mono font-bold text-orange-600 pt-0.5">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                      {item.speaker && (
                        <p className="text-xs text-stone-500 mt-0.5">Speaker: {item.speaker}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organizer Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold font-heading text-xl">
                {event.organizerName.charAt(0)}
              </div>
              <div>
                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold block">
                  Organized By
                </span>
                <h3 className="text-base font-bold text-slate-900">{event.organizerName}</h3>
                {event.organizerEmail && (
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    {event.organizerEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Host
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Card & Seat Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-md sticky top-24 space-y-6">
            
            {/* Pricing & Availability Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs text-stone-500 font-medium">Ticket Price</span>
                <div className="text-2xl font-extrabold font-heading text-slate-900">
                  {event.price || 'Free'}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isSoldOut ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {isSoldOut ? 'Sold Out' : 'Registration Open'}
              </span>
            </div>

            {/* Quick Details Table */}
            <div className="space-y-3.5 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Date</span>
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Schedule</span>
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Venue & Address</span>
                  <span>{event.venue}</span>
                  <span className="block text-stone-400">{event.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-800">Seat Capacity</span>
                    <span className="text-stone-500 font-medium">
                      {event.availableSeats} of {event.maxParticipants} left
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isSoldOut ? 'bg-rose-500' : event.availableSeats < 10 ? 'bg-amber-500' : 'bg-orange-500'
                      }`}
                      style={{
                        width: `${Math.min(100, Math.max(5, ((event.maxParticipants - event.availableSeats) / event.maxParticipants) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Registration CTA Actions */}
            <div className="pt-2 space-y-3">
              {isRegistered ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">You're confirmed for this event!</span>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        Ticket: {registration?.ticketId}
                      </p>
                    </div>
                  </div>

                  <button
                    id="view-my-pass-btn"
                    type="button"
                    onClick={() => {
                      if (registration) setActiveTicket(registration);
                    }}
                    className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    View Entry Pass
                  </button>

                  <button
                    id="cancel-my-reg-btn"
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                    className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 transition-colors"
                  >
                    Cancel Registration
                  </button>
                </div>
              ) : isSoldOut ? (
                <button
                  id="sold-out-cta-btn"
                  type="button"
                  disabled
                  className="w-full py-3.5 px-4 bg-stone-200 text-stone-500 font-bold text-xs rounded-xl cursor-not-allowed"
                >
                  Sold Out
                </button>
              ) : (
                <button
                  id="details-register-now-btn"
                  type="button"
                  onClick={() => onRegisterClick(event)}
                  className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-600/25 transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.01]"
                >
                  <Ticket className="w-4 h-4" />
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancel Registration"
        message={`Are you sure you want to cancel your reservation for "${event.title}"? Your seat will be released for other attendees.`}
        confirmLabel="Yes, Cancel Registration"
        confirmVariant="danger"
        onConfirm={handleCancelRegistrationConfirm}
        onCancel={() => setShowCancelModal(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Created Event"
        message={`Are you sure you want to permanently delete "${event.title}"? All existing attendee registrations will also be removed.`}
        confirmLabel="Yes, Delete Event"
        confirmVariant="danger"
        onConfirm={handleDeleteEventConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};
