import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/EventCard';
import { EventItem, EventCategory } from '../types';
import { CATEGORY_METADATA } from '../data/initialData';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Users, 
  Tag, 
  Flame, 
  PlusCircle, 
  Cpu, 
  Music, 
  Wrench, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Palette,
  CheckCircle,
  MapPin
} from 'lucide-react';

interface HomeViewProps {
  onRegisterClick: (event: EventItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onRegisterClick }) => {
  const { 
    events, 
    registrations, 
    navigateTo, 
    setSearchQuery, 
    setSelectedCategory 
  } = useEvents();

  const [heroSearch, setHeroSearch] = useState('');

  const featuredEvents = events.filter(e => e.isFeatured);
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  const categories: EventCategory[] = [
    'Technology',
    'Music',
    'Workshops',
    'Business',
    'College',
    'Sports',
    'Arts & Culture'
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology': return <Cpu className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      case 'Workshops': return <Wrench className="w-5 h-5" />;
      case 'Business': return <Briefcase className="w-5 h-5" />;
      case 'College': return <GraduationCap className="w-5 h-5" />;
      case 'Sports': return <Trophy className="w-5 h-5" />;
      case 'Arts & Culture': return <Palette className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch.trim());
    }
    navigateTo('explore');
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    navigateTo('explore');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEE4] text-slate-900 rounded-b-[2.5rem] shadow-sm border-b border-stone-200/80">
        {/* Subtle decorative background lights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200/80 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            The Premier Event Management Portal
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight leading-[1.15] text-slate-900">
            Discover Experiences <br className="hidden sm:inline" />
            <span className="text-orange-600">
              Worth Remembering
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Browse high-impact summits, creative workshops, college festivals, and live concerts. Register in seconds, keep verified digital passes, or organize your own event.
          </p>

          {/* Hero Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroSearchSubmit}
              className="p-2 bg-white border border-stone-200 rounded-2xl sm:rounded-full shadow-lg shadow-stone-900/5 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center flex-1 w-full px-4 gap-2.5">
                <Search className="w-5 h-5 text-orange-600 shrink-0" />
                <input
                  id="hero-event-search-input"
                  type="text"
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  placeholder="Search by title, category, city (e.g. AI Summit, Austin)..."
                  className="w-full py-2 bg-transparent text-slate-900 placeholder:text-stone-400 text-sm focus:outline-none"
                />
              </div>
              <button
                id="hero-search-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-all shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 shrink-0"
              >
                <span>Find Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Keyword Suggestions */}
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-stone-500">
              <span>Popular searches:</span>
              {['AI Summit', 'Indie Fest', 'Hackathon', 'UI/UX'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    navigateTo('explore');
                  }}
                  className="px-2.5 py-0.5 rounded-lg bg-white hover:bg-orange-50 text-stone-600 hover:text-orange-700 transition-colors border border-stone-200 shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-explore-btn"
              type="button"
              onClick={() => navigateTo('explore')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md shadow-orange-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Explore Events
            </button>
            <button
              id="hero-create-btn"
              type="button"
              onClick={() => navigateTo('create')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-slate-800 font-semibold text-sm border border-stone-300 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-orange-600" />
              Host / Create Event
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200/80 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {events.length}
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Events Available</p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {registrations.length + 142}
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Registrations Processed</p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-2">
              <Tag className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {categories.length}
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Active Categories</p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              99.4%
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Verified Ticket Rate</p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider font-heading">
              <Tag className="w-3.5 h-3.5" />
              Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1">
              Popular Categories
            </h2>
          </div>
          <button
            id="view-all-categories-btn"
            type="button"
            onClick={() => navigateTo('explore')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            Explore all &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map(cat => {
            const meta = CATEGORY_METADATA[cat];
            const eventCount = events.filter(e => e.category === cat).length;
            return (
              <button
                key={cat}
                id={`cat-card-${cat}`}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-stone-200/80 hover:border-orange-300 shadow-2xs hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-2xl ${meta.bg} ${meta.color} flex items-center justify-center group-hover:scale-110 transition-transform mb-3 shadow-2xs`}>
                  {getCategoryIcon(cat)}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                  {cat}
                </span>
                <span className="text-[11px] text-stone-400 mt-0.5">
                  {eventCount} {eventCount === 1 ? 'event' : 'events'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED EVENTS */}
      {featuredEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider font-heading">
                <Flame className="w-3.5 h-3.5" />
                Hand-Picked Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1">
                Featured Events
              </h2>
            </div>
            <button
              id="see-all-featured-btn"
              type="button"
              onClick={() => navigateTo('explore')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              See All &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredEvents.slice(0, 3).map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={onRegisterClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. UPCOMING EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider font-heading">
              <Calendar className="w-3.5 h-3.5" />
              Calendar Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1">
              Upcoming Experiences
            </h2>
          </div>
          <button
            id="view-all-upcoming-btn"
            type="button"
            onClick={() => navigateTo('explore')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            Browse all events &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {upcomingEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegisterClick={onRegisterClick}
            />
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION FOR ORGANIZERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1320] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle warm lighting accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl relative">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
              For Organizers & Creators
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight">
              Ready to host your own summit, meetup, or concert?
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              Create an event in minutes with Eventra. Manage ticket capacities, accept registrations, and deliver verified passes directly to attendees.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative">
            <button
              id="cta-host-event-btn"
              type="button"
              onClick={() => navigateTo('create')}
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Publish an Event
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
