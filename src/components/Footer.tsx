import React from 'react';
import { useEvents } from '../context/EventContext';
import { Sparkles, Heart, Shield, Award, HelpCircle } from 'lucide-react';
import { EventCategory } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory, resetAllData } = useEvents();

  const categories: EventCategory[] = [
    'Technology',
    'Music',
    'Workshops',
    'Business',
    'College',
    'Sports',
    'Arts & Culture'
  ];

  const handleCategoryClick = (cat: EventCategory) => {
    setSelectedCategory(cat);
    navigateTo('explore');
  };

  return (
    <footer className="bg-[#131E2F] text-stone-300 pt-14 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-heading text-white tracking-tight">
                Eventra
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your comprehensive portal to discover premier tech summits, live concerts, interactive workshops, and collegiate hackathons.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-950/60 text-orange-300 border border-orange-800/40">
                <Award className="w-3.5 h-3.5 text-orange-400" />
                Internship Capstone Project
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-200 mb-4 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('explore')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Explore All Events
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('my-events')}
                  className="hover:text-orange-400 transition-colors"
                >
                  My Registrations & Tickets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('create')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Host / Create New Event
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('profile')}
                  className="hover:text-orange-400 transition-colors"
                >
                  User Profile & Badges
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Categories */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-200 mb-4 font-heading">
              Event Categories
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className="px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-orange-900/40 hover:text-orange-300 text-stone-400 text-xs transition-colors border border-stone-700/50"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Prototype & Data controls */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-200 mb-4 font-heading">
              Developer & Sandbox
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              All events, registrations, and profile modifications are persisted in browser local storage.
            </p>
            <div className="pt-1">
              <button
                id="footer-reset-data-btn"
                type="button"
                onClick={resetAllData}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-orange-400" />
                Reset Sample Data
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Eventra. Built with React, TypeScript & Tailwind CSS.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>for seamless event experiences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
