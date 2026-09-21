import React, { useState } from 'react';
import { Registration } from '../types';
import { X, Calendar, Clock, MapPin, User, CheckCircle, Printer, Copy, Check } from 'lucide-react';
import { useEvents } from '../context/EventContext';

interface TicketModalProps {
  registration: Registration | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ registration, onClose }) => {
  const { showToast } = useEvents();
  const [copied, setCopied] = useState(false);

  if (!registration) return null;

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(registration.ticketId);
    setCopied(true);
    showToast(`Ticket ID ${registration.ticketId} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="ticket-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="ticket-modal-card"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-slate-900 p-6 text-white relative border-b border-slate-800">
          <button
            id="close-ticket-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Official Eventra Pass • {registration.eventCategory}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading leading-tight pr-6">
            {registration.eventTitle}
          </h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Registration Confirmed
            </span>
          </div>
        </div>

        {/* Ticket Content Body */}
        <div className="p-6 space-y-6">
          {/* Key Event Details Grid */}
          <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-sm">
            <div>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-orange-500" /> Date
              </span>
              <p className="font-semibold text-slate-800">
                {new Date(registration.eventDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-orange-500" /> Time
              </span>
              <p className="font-semibold text-slate-800">{registration.eventTime}</p>
            </div>

            <div className="col-span-2 pt-2 border-t border-stone-200/60">
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" /> Venue & Location
              </span>
              <p className="font-semibold text-slate-800">{registration.eventVenue}</p>
              <p className="text-xs text-stone-500">{registration.eventLocation}</p>
            </div>
          </div>

          {/* Attendee Info */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-sm">
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1 mb-2">
              <User className="w-3.5 h-3.5 text-stone-500" /> Attendee Credentials
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-stone-400">Name</p>
                <p className="font-semibold text-slate-800">{registration.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400">Email</p>
                <p className="font-medium text-slate-700 truncate">{registration.email}</p>
              </div>
              {registration.organization && (
                <div className="col-span-2 pt-1">
                  <p className="text-xs text-stone-400">Affiliation / College</p>
                  <p className="font-medium text-slate-700">{registration.organization}</p>
                </div>
              )}
            </div>
          </div>

          {/* Digital Ticket Pass Stub / QR Code Simulation */}
          <div className="relative p-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-inner">
            {/* Left Ticket Code */}
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider text-stone-400">Digital Ticket Pass</span>
              <div className="text-2xl font-mono font-bold tracking-widest text-orange-400">
                {registration.ticketId}
              </div>
              <p className="text-[11px] text-stone-400">Present this digital pass or ticket ID upon entry</p>
            </div>

            {/* Right QR Code Graphic */}
            <div className="p-2 bg-white rounded-xl shadow-md shrink-0 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-950 p-1 rounded-lg flex flex-wrap gap-1 items-center justify-center">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="5" y="5" width="20" height="20" fill="#020617" />
                  <rect x="10" y="10" width="10" height="10" />
                  
                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="75" y="5" width="20" height="20" fill="#020617" />
                  <rect x="80" y="10" width="10" height="10" />

                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="5" y="75" width="20" height="20" fill="#020617" />
                  <rect x="10" y="80" width="10" height="10" />

                  <rect x="40" y="10" width="10" height="20" />
                  <rect x="55" y="5" width="8" height="15" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="10" y="45" width="15" height="10" />
                  <rect x="75" y="45" width="15" height="10" />
                  <rect x="40" y="70" width="15" height="15" />
                  <rect x="65" y="70" width="25" height="10" />
                  <rect x="70" y="85" width="15" height="15" />
                </svg>
              </div>
              <span className="text-[9px] text-stone-600 font-mono mt-1 font-semibold">VERIFIED PASS</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              id="copy-ticket-id-btn"
              type="button"
              onClick={handleCopyTicket}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Pass ID'}
            </button>

            <div className="flex items-center gap-2">
              <button
                id="print-ticket-btn"
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200/80 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
              <button
                id="ticket-modal-done-btn"
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
