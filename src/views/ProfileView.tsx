import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Ticket, 
  PlusCircle, 
  Edit3, 
  X, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EventCategory } from '../types';

export const ProfileView: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    registrations, 
    events, 
    navigateTo, 
    setActiveTicket, 
    resetAllData 
  } = useEvents();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [organization, setOrganization] = useState(userProfile.organization);
  const [bio, setBio] = useState(userProfile.bio);

  const registeredEventsCount = registrations.filter(r => r.status === 'confirmed').length;
  const createdEventsCount = events.filter(e => e.isCreatedByUser).length;

  // Upcoming registered events sorted by date
  const upcomingRegistrations = [...registrations]
    .filter(r => r.status === 'confirmed')
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || userProfile.name,
      email: email.trim() || userProfile.email,
      phone: phone.trim() || userProfile.phone,
      organization: organization.trim(),
      bio: bio.trim(),
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-50/60 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-orange-50 shadow-sm"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-lg shadow-sm" title="Active member">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/60">
                  Attendee & Host
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">
                {userProfile.organization || 'Eventra Community Member'}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  {userProfile.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  {userProfile.phone}
                </span>
              </div>
            </div>
          </div>

          <button
            id="edit-profile-btn"
            type="button"
            onClick={() => {
              setName(userProfile.name);
              setEmail(userProfile.email);
              setPhone(userProfile.phone);
              setOrganization(userProfile.organization);
              setBio(userProfile.bio);
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bio */}
        {userProfile.bio && (
          <div className="mt-6 pt-5 border-t border-stone-100">
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              {userProfile.bio}
            </p>
          </div>
        )}
      </div>

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div
          onClick={() => navigateTo('my-events')}
          className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-orange-300 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">
              Events Registered
            </span>
            <span className="text-3xl font-extrabold font-heading text-slate-900 mt-1 block">
              {registeredEventsCount}
            </span>
            <span className="text-xs text-orange-600 font-medium mt-1 flex items-center gap-1">
              View your passes &rarr;
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        <div
          onClick={() => navigateTo('my-events')}
          className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-orange-300 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">
              Events Created
            </span>
            <span className="text-3xl font-extrabold font-heading text-slate-900 mt-1 block">
              {createdEventsCount}
            </span>
            <span className="text-xs text-orange-600 font-medium mt-1 flex items-center gap-1">
              Manage hosted events &rarr;
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">
              Upcoming Attending
            </span>
            <span className="text-3xl font-extrabold font-heading text-slate-900 mt-1 block">
              {upcomingRegistrations.length}
            </span>
            <span className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              Active tickets ready
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Upcoming Events Agenda Section */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Upcoming Registered Schedule
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Chronological schedule of events you are confirmed to attend.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('explore')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            Find more events &rarr;
          </button>
        </div>

        {upcomingRegistrations.length > 0 ? (
          <div className="space-y-4">
            {upcomingRegistrations.map(reg => (
              <div
                key={reg.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-100/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-200">
                    <img
                      src={reg.eventImageUrl}
                      alt={reg.eventTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                      {reg.eventCategory}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {reg.eventTitle}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {new Date(reg.eventDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })} • {reg.eventTime} • {reg.eventVenue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTicket(reg)}
                    className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('details', reg.eventId)}
                    className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-stone-500 text-xs">
            No upcoming events scheduled. Explore events to register and see them here.
          </div>
        )}
      </div>

      {/* Account Settings / Developer Sandbox Control */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Prototype Persistence & Reset</h4>
          <p className="text-xs text-stone-500 mt-0.5">
            All your changes are preserved in your browser's local storage. Want to start with a fresh slate?
          </p>
        </div>
        <button
          id="profile-reset-all-btn"
          type="button"
          onClick={resetAllData}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl shadow-2xs transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
          Reset Demo Data
        </button>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div
          id="edit-profile-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsEditing(false)}
        >
          <div
            id="edit-profile-modal"
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden transform animate-in zoom-in-95 p-6 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Edit Profile Information
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Organization / College</label>
                <input
                  type="text"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  placeholder="e.g. Stanford University or Acme Corp"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Bio / Headline</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Tell others a bit about your background and interests..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 font-semibold text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
