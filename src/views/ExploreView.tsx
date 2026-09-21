import React, { useState, useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/EventCard';
import { EventItem, EventCategory } from '../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  ArrowUpDown, 
  X, 
  Sparkles, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface ExploreViewProps {
  onRegisterClick: (event: EventItem) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onRegisterClick }) => {
  const { 
    events, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useEvents();

  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('date-asc');
  const [onlyAvailableSeats, setOnlyAvailableSeats] = useState<boolean>(false);

  const categories: string[] = [
    'All',
    'Technology',
    'Music',
    'Workshops',
    'Business',
    'College',
    'Sports',
    'Arts & Culture'
  ];

  // Filtering and sorting logic
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // 1. Search Query Filter (Title, description, venue, location, organizer)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesDesc = (event.shortDescription || event.description).toLowerCase().includes(q);
        const matchesVenue = event.venue.toLowerCase().includes(q);
        const matchesLocation = event.location.toLowerCase().includes(q);
        const matchesOrganizer = event.organizerName.toLowerCase().includes(q);
        const matchesCategory = event.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesLocation && !matchesOrganizer && !matchesCategory) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Seat availability
      if (onlyAvailableSeats && event.availableSeats <= 0) {
        return false;
      }

      // 4. Date filtering
      if (dateFilter !== 'all') {
        const eventDate = new Date(event.date);
        const today = new Date('2026-09-21T00:00:00'); // current mock time is 2026-09-21

        if (dateFilter === 'this-month') {
          if (
            eventDate.getFullYear() !== today.getFullYear() ||
            eventDate.getMonth() !== today.getMonth()
          ) {
            // Include next 30 days for rich sample view
            const diffTime = eventDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 0 || diffDays > 45) return false;
          }
        } else if (dateFilter === 'next-month') {
          const diffTime = eventDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays <= 45 || diffDays > 90) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortOption === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === 'seats-desc') {
        return b.availableSeats - a.availableSeats;
      } else if (sortOption === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [events, searchQuery, selectedCategory, onlyAvailableSeats, dateFilter, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDateFilter('all');
    setSortOption('date-asc');
    setOnlyAvailableSeats(false);
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'All' || 
    dateFilter !== 'all' || 
    onlyAvailableSeats || 
    sortOption !== 'date-asc';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/80 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            Discover & Attend
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Explore Events
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Browse through conferences, indie music concerts, collegiate hackathons, and workshops.
          </p>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl">
            Showing <strong className="text-slate-800">{filteredEvents.length}</strong> of {events.length} events
          </span>
          {hasActiveFilters && (
            <button
              id="reset-filters-btn"
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-4 sm:p-5 space-y-4">
        {/* Row 1: Search and Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              id="explore-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by event title, location, organizer, keywords..."
              className="w-full pl-10 pr-9 py-2.5 bg-stone-50 hover:bg-white focus:bg-white text-sm rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Date Filter Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <select
                id="explore-date-select"
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-stone-50 hover:bg-white focus:bg-white text-xs sm:text-sm font-medium rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Dates</option>
                <option value="this-month">Next 45 Days</option>
                <option value="next-month">Later (45+ Days)</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-3.5 text-stone-400 text-xs">▼</div>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <select
                id="explore-sort-select"
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-stone-50 hover:bg-white focus:bg-white text-xs sm:text-sm font-medium rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="date-asc">Date: Soonest First</option>
                <option value="date-desc">Date: Furthest Out</option>
                <option value="seats-desc">Available Seats: High to Low</option>
                <option value="title-asc">Title: Alphabetical (A-Z)</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-3.5 text-stone-400 text-xs">▼</div>
            </div>
          </div>
        </div>

        {/* Row 2: Category Filter Pills & Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-stone-100">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-cat-${cat}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs shadow-orange-600/20'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Only Available Seats Toggle */}
          <div className="shrink-0 flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer select-none">
              <input
                id="available-seats-only-toggle"
                type="checkbox"
                checked={onlyAvailableSeats}
                onChange={e => setOnlyAvailableSeats(e.target.checked)}
                className="rounded text-orange-600 focus:ring-orange-500"
              />
              <span>Available Seats Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegisterClick={onRegisterClick}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/90 shadow-xs px-4">
          <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900">
            No events match your criteria
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mt-2">
            We couldn't find any events matching your current search or category filters. Try clearing some filters or searching for something else.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              id="empty-state-reset-filters-btn"
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-xs shadow-orange-600/20 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
