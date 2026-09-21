import React from 'react';
import { EventItem } from '../types';
import { useEvents } from '../context/EventContext';
import { CATEGORY_METADATA } from '../data/initialData';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onRegisterClick?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegisterClick }) => {
  const { navigateTo, isUserRegisteredForEvent } = useEvents();
  const isRegistered = isUserRegisteredForEvent(event.id);
  const isSoldOut = event.availableSeats <= 0;
  const categoryMeta = CATEGORY_METADATA[event.category] || {
    label: event.category,
    color: 'text-stone-800',
    bg: 'bg-stone-100',
    border: 'border-stone-200'
  };

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const monthShort = new Date(event.date).toLocaleDateString('en-US', { month: 'short' });
  const dayNum = new Date(event.date).getDate();

  return (
    <div
      id={`event-card-${event.id}`}
      className="group bg-white rounded-2xl border border-stone-200/90 hover:border-orange-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Top Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={e => {
            // Fallback image if unsplash link breaks
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Date Calendar Floating Pill */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-1.5 px-2.5 text-center shadow-md border border-white/40">
          <span className="block text-[10px] uppercase font-bold tracking-wider text-orange-600 leading-none">
            {monthShort}
          </span>
          <span className="block text-base font-extrabold text-slate-900 leading-tight">
            {dayNum}
          </span>
        </div>

        {/* Category & Status Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 flex-wrap justify-end">
          {isRegistered && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Registered
            </span>
          )}
          {event.isFeatured && !isRegistered && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-sm">
              Featured
            </span>
          )}
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/95 ${categoryMeta.color} shadow-2xs border border-white/60`}>
            {event.category}
          </span>
        </div>

        {/* Price & Venue bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            {event.price || 'Free'}
          </span>
          <span className="truncate max-w-[180px] font-medium text-white/90 drop-shadow-sm flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
            {event.location}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Timing details */}
          <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {event.startTime}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => navigateTo('details', event.id)}
            className="text-lg font-bold font-heading text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 cursor-pointer"
            title={event.title}
          >
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {event.shortDescription || event.description}
          </p>

          {/* Venue line */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Card Footer: Seats & Action */}
        <div className="mt-5 pt-3.5 border-t border-stone-100 flex flex-col gap-3">
          {/* Seat Capacity indicator */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              {isSoldOut ? (
                <span className="text-rose-600 font-semibold">Sold Out</span>
              ) : (
                <>
                  <span className="font-semibold text-slate-800">{event.availableSeats}</span> seats left
                </>
              )}
            </span>
            <span className="text-stone-400 text-[11px]">
              Capacity: {event.maxParticipants}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isSoldOut
                  ? 'bg-rose-500'
                  : event.availableSeats < 10
                  ? 'bg-amber-500'
                  : 'bg-orange-500'
              }`}
              style={{
                width: `${Math.min(100, Math.max(8, ((event.maxParticipants - event.availableSeats) / event.maxParticipants) * 100))}%`
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              id={`details-btn-${event.id}`}
              type="button"
              onClick={() => navigateTo('details', event.id)}
              className="flex-1 py-2 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              View Details
              <ArrowRight className="w-3 h-3 text-stone-400" />
            </button>

            {!isRegistered && !isSoldOut && onRegisterClick && (
              <button
                id={`quick-reg-btn-${event.id}`}
                type="button"
                onClick={() => onRegisterClick(event)}
                className="py-2 px-3.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-xs shadow-orange-600/20 transition-colors"
              >
                Register
              </button>
            )}

            {isRegistered && (
              <button
                id={`registered-status-btn-${event.id}`}
                type="button"
                onClick={() => navigateTo('my-events')}
                className="py-2 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200/60 transition-colors"
              >
                Pass &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
