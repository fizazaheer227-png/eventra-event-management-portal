import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { ViewType } from '../types';
import { 
  Compass, 
  Calendar, 
  PlusCircle, 
  BookmarkCheck, 
  User, 
  Search, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, navigateTo, registrations, searchQuery, setSearchQuery } = useEvents();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const activeRegistrationsCount = registrations.filter(r => r.status === 'confirmed').length;

  const navItems: { view: ViewType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { view: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { view: 'explore', label: 'Explore Events', icon: <Calendar className="w-4 h-4" /> },
    { 
      view: 'my-events', 
      label: 'My Events', 
      icon: <BookmarkCheck className="w-4 h-4" />,
      badge: activeRegistrationsCount > 0 ? activeRegistrationsCount : undefined 
    },
    { view: 'create', label: 'Create Event', icon: <PlusCircle className="w-4 h-4" /> },
    { view: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      setSearchQuery(headerSearch.trim());
      navigateTo('explore');
      setHeaderSearch('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold font-heading tracking-tight text-slate-900">
                Eventra<span className="text-orange-600">.</span>
              </span>
              <span className="hidden sm:block text-[10px] text-stone-400 font-semibold tracking-wider uppercase -mt-1">
                Event Management Portal
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm relative"
          >
            <Search className="w-4 h-4 absolute left-3 text-stone-400 pointer-events-none" />
            <input
              id="navbar-search-input"
              type="text"
              value={headerSearch}
              onChange={e => setHeaderSearch(e.target.value)}
              placeholder="Search tech, music, workshops..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-stone-100 hover:bg-stone-50 focus:bg-white text-xs text-slate-800 rounded-xl border border-transparent focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-stone-400"
            />
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-link-${item.view}`}
                  type="button"
                  onClick={() => navigateTo(item.view)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-orange-600 bg-orange-50 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-orange-600 text-white min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Mobile Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              id="header-create-event-cta"
              type="button"
              onClick={() => navigateTo('create')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-sm shadow-orange-600/25 transition-all hover:shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Host Event</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer"
            className="lg:hidden border-t border-stone-100 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
              <input
                id="mobile-search-input"
                type="text"
                value={headerSearch}
                onChange={e => setHeaderSearch(e.target.value)}
                placeholder="Search events, organizers..."
                className="w-full pl-9 pr-4 py-2 bg-stone-100 text-xs rounded-xl border border-transparent focus:bg-white focus:border-orange-400 outline-none"
              />
            </form>

            <div className="flex flex-col gap-1">
              {navItems.map(item => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    id={`mobile-nav-${item.view}`}
                    type="button"
                    onClick={() => {
                      navigateTo(item.view);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : 'text-slate-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-600 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
