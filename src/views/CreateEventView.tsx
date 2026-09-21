import React, { useState, useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import { EventCategory, EventItem } from '../types';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  Image as ImageIcon, 
  User, 
  DollarSign, 
  ArrowLeft, 
  Check, 
  AlertCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';

const CURATED_IMAGE_PRESETS: { label: string; category: EventCategory; url: string }[] = [
  {
    label: 'Tech Summit Stage',
    category: 'Technology',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Modern Coding Lab',
    category: 'Technology',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Concert & Neon Stage',
    category: 'Music',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Live Festival Crowd',
    category: 'Music',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Design & Craft Workshop',
    category: 'Workshops',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Business Pitch Conference',
    category: 'Business',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'College Hackathon',
    category: 'College',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Athletics & Marathon',
    category: 'Sports',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Contemporary Art Gallery',
    category: 'Arts & Culture',
    url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'
  }
];

export const CreateEventView: React.FC = () => {
  const { 
    events, 
    editingEventId, 
    addEvent, 
    updateEvent, 
    navigateTo, 
    userProfile 
  } = useEvents();

  const isEditMode = !!editingEventId;
  const existingEvent = isEditMode ? events.find(e => e.id === editingEventId) : null;

  // Form states
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EventCategory>('Technology');
  const [date, setDate] = useState('2026-10-28');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('04:00 PM');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [organizerName, setOrganizerName] = useState(userProfile.name || 'Event Host');
  const [organizerEmail, setOrganizerEmail] = useState(userProfile.email || '');
  const [maxParticipants, setMaxParticipants] = useState<number>(100);
  const [price, setPrice] = useState('Free');
  const [imageUrl, setImageUrl] = useState(CURATED_IMAGE_PRESETS[0].url);
  const [customImageMode, setCustomImageMode] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If edit mode, load existing data
  useEffect(() => {
    if (isEditMode && existingEvent) {
      setTitle(existingEvent.title);
      setShortDescription(existingEvent.shortDescription || '');
      setDescription(existingEvent.description);
      setCategory(existingEvent.category);
      setDate(existingEvent.date);
      setStartTime(existingEvent.startTime);
      setEndTime(existingEvent.endTime);
      setVenue(existingEvent.venue);
      setLocation(existingEvent.location);
      setOrganizerName(existingEvent.organizerName);
      setOrganizerEmail(existingEvent.organizerEmail || '');
      setMaxParticipants(existingEvent.maxParticipants);
      setPrice(existingEvent.price || 'Free');
      setImageUrl(existingEvent.imageUrl);
      setIsFeatured(!!existingEvent.isFeatured);
    }
  }, [isEditMode, existingEvent]);

  const categories: EventCategory[] = [
    'Technology',
    'Music',
    'Workshops',
    'Business',
    'College',
    'Sports',
    'Arts & Culture'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Event title is required.';
    if (!description.trim()) errs.description = 'Event description is required.';
    if (!date.trim()) errs.date = 'Event date is required.';
    if (!startTime.trim()) errs.startTime = 'Start time is required.';
    if (!endTime.trim()) errs.endTime = 'End time is required.';
    if (!venue.trim()) errs.venue = 'Venue is required.';
    if (!location.trim()) errs.location = 'City / Location is required.';
    if (!organizerName.trim()) errs.organizerName = 'Organizer name is required.';
    if (isNaN(maxParticipants) || maxParticipants <= 0) {
      errs.maxParticipants = 'Participant capacity must be greater than 0.';
    }
    if (!imageUrl.trim()) errs.imageUrl = 'An event image is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const eventPayload = {
      title: title.trim(),
      shortDescription: shortDescription.trim() || description.slice(0, 120) + '...',
      description: description.trim(),
      category,
      date,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      venue: venue.trim(),
      location: location.trim(),
      organizerName: organizerName.trim(),
      organizerEmail: organizerEmail.trim(),
      maxParticipants: Number(maxParticipants),
      price: price.trim() || 'Free',
      imageUrl: imageUrl.trim(),
      isFeatured,
      tags: [category, 'Community', price === 'Free' ? 'Free Admission' : 'Ticketed']
    };

    setTimeout(() => {
      if (isEditMode && existingEvent) {
        updateEvent(existingEvent.id, eventPayload);
        setIsSubmitting(false);
        navigateTo('details', existingEvent.id);
      } else {
        const created = addEvent(eventPayload);
        setIsSubmitting(false);
        navigateTo('details', created.id);
      }
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner & Return */}
      <div className="flex items-center justify-between">
        <button
          id="create-back-btn"
          type="button"
          onClick={() => navigateTo('explore')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Return</span>
        </button>

        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
          {isEditMode ? 'Editing Mode' : 'Organizer Portal'}
        </span>
      </div>

      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/60 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          {isEditMode ? 'Update Details' : 'Create an Experience'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          {isEditMode ? 'Edit Event Details' : 'Host a New Event'}
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          {isEditMode 
            ? 'Make adjustments to your event itinerary, venue, capacity, or banner.' 
            : 'Fill in your event information. Once created, it will immediately appear in Explore Events and accept attendee registrations.'}
        </p>
      </div>

      {/* Main Grid: Left 2 Cols (Form), Right 1 Col (Live Card Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
            
            {/* Section 1: Basic Info */}
            <div className="space-y-4">
              <h3 className="text-base font-bold font-heading text-slate-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-600" />
                Basic Event Information
              </h3>

              <div>
                <label htmlFor="evt-title" className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Event Title <span className="text-rose-500">*</span>
                </label>
                <input
                  id="evt-title"
                  type="text"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
                  }}
                  placeholder="e.g. NextGen Web Summit 2026"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.title ? 'border-rose-300 focus:ring-rose-100 bg-rose-50/20' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-100'
                  }`}
                />
                {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="evt-category" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="evt-category"
                    value={category}
                    onChange={e => {
                      const newCat = e.target.value as EventCategory;
                      setCategory(newCat);
                      // Suggest preset image for this category if using standard presets
                      const preset = CURATED_IMAGE_PRESETS.find(p => p.category === newCat);
                      if (preset && !customImageMode) {
                        setImageUrl(preset.url);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="evt-price" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Ticket Price
                  </label>
                  <input
                    id="evt-price"
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Free or $25"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="evt-short-desc" className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Short Tagline / Summary <span className="text-stone-400 font-normal">(appears on event cards)</span>
                </label>
                <input
                  id="evt-short-desc"
                  type="text"
                  value={shortDescription}
                  onChange={e => setShortDescription(e.target.value)}
                  placeholder="e.g. Join 300+ developers for deep dives into modern AI tools."
                  maxLength={140}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                />
              </div>

              <div>
                <label htmlFor="evt-desc" className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Full Event Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="evt-desc"
                  rows={4}
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                  }}
                  placeholder="Describe your event agenda, what participants will learn or experience, keynote speakers, and what to bring..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.description ? 'border-rose-300 focus:ring-rose-100 bg-rose-50/20' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-100'
                  }`}
                />
                {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Section 2: Date, Time & Venue */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-base font-bold font-heading text-slate-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                Date, Time & Location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="evt-date" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="evt-date"
                    type="date"
                    value={date}
                    onChange={e => {
                      setDate(e.target.value);
                      if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                  {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="evt-start-time" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Start Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="evt-start-time"
                    type="text"
                    value={startTime}
                    onChange={e => {
                      setStartTime(e.target.value);
                      if (errors.startTime) setErrors(prev => ({ ...prev, startTime: '' }));
                    }}
                    placeholder="10:00 AM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                  {errors.startTime && <p className="text-xs text-rose-500 mt-1">{errors.startTime}</p>}
                </div>

                <div>
                  <label htmlFor="evt-end-time" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    End Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="evt-end-time"
                    type="text"
                    value={endTime}
                    onChange={e => {
                      setEndTime(e.target.value);
                      if (errors.endTime) setErrors(prev => ({ ...prev, endTime: '' }));
                    }}
                    placeholder="05:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                  {errors.endTime && <p className="text-xs text-rose-500 mt-1">{errors.endTime}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="evt-venue" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Venue / Hall <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="evt-venue"
                    type="text"
                    value={venue}
                    onChange={e => {
                      setVenue(e.target.value);
                      if (errors.venue) setErrors(prev => ({ ...prev, venue: '' }));
                    }}
                    placeholder="e.g. Innovation Hall, Floor 3"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                  {errors.venue && <p className="text-xs text-rose-500 mt-1">{errors.venue}</p>}
                </div>

                <div>
                  <label htmlFor="evt-location" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    City, State / Region <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="evt-location"
                    type="text"
                    value={location}
                    onChange={e => {
                      setLocation(e.target.value);
                      if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                    }}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                  {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Capacity & Organizer */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-base font-bold font-heading text-slate-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600" />
                Capacity & Organizer Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="evt-capacity" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Maximum Capacity (Seats) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="evt-capacity"
                    type="number"
                    min={1}
                    max={10000}
                    value={maxParticipants}
                    onChange={e => {
                      setMaxParticipants(parseInt(e.target.value) || 0);
                      if (errors.maxParticipants) setErrors(prev => ({ ...prev, maxParticipants: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                  {errors.maxParticipants && <p className="text-xs text-rose-500 mt-1">{errors.maxParticipants}</p>}
                </div>

                <div>
                  <label htmlFor="evt-organizer-name" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Organizer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="evt-organizer-name"
                    type="text"
                    value={organizerName}
                    onChange={e => {
                      setOrganizerName(e.target.value);
                      if (errors.organizerName) setErrors(prev => ({ ...prev, organizerName: '' }));
                    }}
                    placeholder="Host organization or your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                  {errors.organizerName && <p className="text-xs text-rose-500 mt-1">{errors.organizerName}</p>}
                </div>

                <div>
                  <label htmlFor="evt-organizer-email" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Organizer Contact Email
                  </label>
                  <input
                    id="evt-organizer-email"
                    type="email"
                    value={organizerEmail}
                    onChange={e => setOrganizerEmail(e.target.value)}
                    placeholder="host@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Banner Image */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-orange-600" />
                  Event Banner Image
                </h3>
                <button
                  type="button"
                  onClick={() => setCustomImageMode(!customImageMode)}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  {customImageMode ? 'Pick from Presets' : 'Enter Custom Image URL'}
                </button>
              </div>

              {customImageMode ? (
                <div>
                  <label htmlFor="evt-image-url" className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Custom Image URL
                  </label>
                  <input
                    id="evt-image-url"
                    type="url"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm bg-white outline-none"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs text-stone-500 font-medium">
                    Choose a curated photography style:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {CURATED_IMAGE_PRESETS.map((p, idx) => {
                      const isSelected = imageUrl === p.url;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImageUrl(p.url)}
                          className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all group ${
                            isSelected ? 'border-orange-600 ring-2 ring-orange-200 shadow-sm' : 'border-stone-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1 text-center">
                            <span className="text-[10px] font-bold text-white leading-tight">
                              {p.label}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-orange-600 text-white rounded-full p-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Bar */}
            <div className="pt-6 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                id="form-cancel-btn"
                type="button"
                onClick={() => navigateTo('explore')}
                className="px-5 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                id="form-submit-event-btn"
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-xs shadow-orange-600/20 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Saving Event...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isEditMode ? 'Update Event' : 'Publish Event'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Live Preview Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-orange-600" />
            Live Card Preview
          </div>

          <div className="bg-white rounded-2xl border border-orange-200/80 shadow-md overflow-hidden sticky top-24">
            <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
              <img
                src={imageUrl}
                alt="Event preview"
                className="w-full h-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src = CURATED_IMAGE_PRESETS[0].url;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute top-3 left-3 bg-white/95 rounded-xl p-1 px-2 text-center text-xs shadow-sm">
                <span className="block text-[9px] font-bold text-orange-600 uppercase">
                  {new Date(date || '2026-10-28').toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="block text-sm font-extrabold text-slate-900 leading-tight">
                  {new Date(date || '2026-10-28').getDate()}
                </span>
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-orange-700">
                {category}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white text-xs font-semibold">
                <span className="bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">{price}</span>
                <span className="truncate max-w-[150px]">{location || 'City, State'}</span>
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              <div className="text-[11px] text-stone-500 flex items-center gap-2">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>{date}</span>
                <span>•</span>
                <span>{startTime}</span>
              </div>
              <h4 className="text-base font-bold font-heading text-slate-900 line-clamp-1">
                {title || 'Untitled Event'}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {shortDescription || description || 'Your event description will appear here on Explore cards.'}
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Capacity: {maxParticipants} seats</span>
                <span className="text-orange-600 font-bold">Preview</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
