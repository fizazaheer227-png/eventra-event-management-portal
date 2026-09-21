import React, { useState, useEffect } from 'react';
import { EventItem, Registration } from '../types';
import { useEvents } from '../context/EventContext';
import { X, CheckCircle, Ticket, Calendar, MapPin, User, Mail, Phone, Building, AlertCircle } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onSuccessRegistered?: (registration: Registration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  event,
  onClose,
  onSuccessRegistered,
}) => {
  const { registerForEvent, isUserRegisteredForEvent, userProfile, navigateTo, setActiveTicket } = useEvents();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRegistration, setConfirmedRegistration] = useState<Registration | null>(null);

  // Pre-fill fields from user profile when modal opens
  useEffect(() => {
    if (isOpen && userProfile) {
      setFullName(userProfile.name || '');
      setEmail(userProfile.email || '');
      setPhoneNumber(userProfile.phone || '');
      setOrganization(userProfile.organization || '');
      setErrors({});
      setConfirmedRegistration(null);
    }
  }, [isOpen, userProfile, event]);

  if (!isOpen || !event) return null;

  const isAlreadyRegistered = isUserRegisteredForEvent(event.id);
  const isSoldOut = event.availableSeats <= 0;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required.';
    } else if (phoneNumber.trim().length < 7) {
      errs.phoneNumber = 'Please enter a valid phone number.';
    }
    if (!agreeTerms) {
      errs.agreeTerms = 'You must agree to event guidelines.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAlreadyRegistered || isSoldOut) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerForEvent(event.id, {
        fullName,
        email,
        phoneNumber,
        organization,
      });

      setIsSubmitting(false);

      if (res.success && res.registration) {
        setConfirmedRegistration(res.registration);
        if (onSuccessRegistered) {
          onSuccessRegistered(res.registration);
        }
      } else if (res.error) {
        setErrors({ general: res.error });
      }
    }, 400);
  };

  return (
    <div
      id="registration-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="registration-modal-container"
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            id="close-registration-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs uppercase tracking-wider text-orange-400 font-semibold">
            {confirmedRegistration ? 'Registration Successful' : 'Event Registration'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-heading mt-1 pr-6 leading-tight">
            {event.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              {event.location}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-200 font-medium">
              {event.price || 'Free'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* SUCCESS STATE */}
          {confirmedRegistration ? (
            <div className="text-center py-4 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">
                  You're Officially Registered!
                </h3>
                <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  A confirmation has been logged. Your pass is ready and has been automatically added to your personal events dashboard.
                </p>
              </div>

              {/* Ticket Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Ticket Pass ID</span>
                    <p className="text-lg font-mono font-bold text-orange-600">{confirmedRegistration.ticketId}</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                    Confirmed
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                  <div>
                    <span className="text-stone-400 block">Attendee</span>
                    <span className="font-semibold text-slate-800">{confirmedRegistration.fullName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Email</span>
                    <span className="font-semibold text-slate-800 truncate block">{confirmedRegistration.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  id="view-pass-btn"
                  type="button"
                  onClick={() => {
                    onClose();
                    setActiveTicket(confirmedRegistration);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded-xl shadow-xs shadow-orange-600/20 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  View Digital Pass
                </button>
                <button
                  id="go-to-my-events-btn"
                  type="button"
                  onClick={() => {
                    onClose();
                    navigateTo('my-events');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  View in My Events
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <div>
              {isAlreadyRegistered && (
                <div className="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">You are already registered for this event!</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Your seat is reserved. You can view your pass anytime in the "My Events" section.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigateTo('my-events');
                      }}
                      className="mt-2 text-xs font-bold text-amber-900 underline hover:text-amber-950"
                    >
                      Go to My Events &rarr;
                    </button>
                  </div>
                </div>
              )}

              {isSoldOut && !isAlreadyRegistered && (
                <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Event is Sold Out</p>
                    <p className="text-xs text-rose-700 mt-0.5">
                      All {event.maxParticipants} available seats for this event have been filled. Please check out other upcoming events.
                    </p>
                  </div>
                </div>
              )}

              {errors.general && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Seat Availability Bar */}
              <div className="mb-5 p-3.5 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-stone-500">Seat Capacity Status</span>
                  <p className="text-sm font-bold text-slate-800">
                    {event.availableSeats} of {event.maxParticipants} seats remaining
                  </p>
                </div>
                <div className="w-24 bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      event.availableSeats < 10 ? 'bg-amber-500' : 'bg-orange-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(5, ((event.maxParticipants - event.availableSeats) / event.maxParticipants) * 100))}%`
                    }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reg-fullname" className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-fullname"
                    type="text"
                    disabled={isAlreadyRegistered || isSoldOut}
                    value={fullName}
                    onChange={e => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-stone-200 focus:border-orange-500 focus:ring-orange-100 bg-white'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-email" className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      disabled={isAlreadyRegistered || isSoldOut}
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="alex.morgan@domain.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                          : 'border-stone-200 focus:border-orange-500 focus:ring-orange-100 bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reg-phone" className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      disabled={isAlreadyRegistered || isSoldOut}
                      value={phoneNumber}
                      onChange={e => {
                        setPhoneNumber(e.target.value);
                        if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                      }}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.phoneNumber
                          ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                          : 'border-stone-200 focus:border-orange-500 focus:ring-orange-100 bg-white'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-org" className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-stone-400" />
                    College / Organization <span className="text-stone-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="reg-org"
                    type="text"
                    disabled={isAlreadyRegistered || isSoldOut}
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="e.g. Stanford University or Acme Labs"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white focus:outline-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600">
                    <input
                      id="reg-terms-checkbox"
                      type="checkbox"
                      disabled={isAlreadyRegistered || isSoldOut}
                      checked={agreeTerms}
                      onChange={e => {
                        setAgreeTerms(e.target.checked);
                        if (errors.agreeTerms) setErrors(prev => ({ ...prev, agreeTerms: '' }));
                      }}
                      className="mt-0.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span>
                      I agree to the attendee code of conduct and consent to event notifications from the organizer.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.agreeTerms}</p>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100 mt-4">
                  <button
                    id="cancel-reg-modal-btn"
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    id="submit-registration-btn"
                    type="submit"
                    disabled={isSubmitting || isAlreadyRegistered || isSoldOut}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-xl text-white shadow-xs transition-all flex items-center gap-2 ${
                      isAlreadyRegistered || isSoldOut
                        ? 'bg-stone-400 cursor-not-allowed shadow-none'
                        : 'bg-orange-600 hover:bg-orange-500 shadow-orange-600/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Registering...
                      </>
                    ) : isAlreadyRegistered ? (
                      'Already Registered'
                    ) : isSoldOut ? (
                      'Sold Out'
                    ) : (
                      'Confirm Registration'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
