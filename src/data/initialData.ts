import { EventItem, Registration, UserProfile } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-tech-1',
    title: 'NextGen AI & Cloud Summit 2026',
    shortDescription: 'Explore breakthroughs in generative models, scalable cloud architectures, and agentic workflows.',
    description: 'Join industry pioneers, researchers, and technical leaders for an immersive full-day summit on NextGen Artificial Intelligence and modern cloud computing. Gain hands-on insights into frontier neural models, automated deployment pipelines, real-world agent orchestration, and enterprise scale architectures.',
    category: 'Technology',
    date: '2026-10-14',
    startTime: '09:00 AM',
    endTime: '05:30 PM',
    venue: 'Silicon Hall & Grand Ballroom, Civic Center',
    location: 'San Francisco, CA',
    organizerName: 'Bay Area Tech Innovations',
    organizerEmail: 'summit@bayinnovations.org',
    maxParticipants: 350,
    availableSeats: 48,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    price: 'Free',
    isFeatured: true,
    tags: ['Artificial Intelligence', 'Cloud', 'Networking', 'Keynotes'],
    agenda: [
      { time: '09:00 AM', title: 'Registration & Welcome Breakfast' },
      { time: '10:00 AM', title: 'Keynote: The Evolution of Autonomous Systems', speaker: 'Dr. Elena Vance' },
      { time: '11:45 AM', title: 'Fireside Chat: Cloud Infrastructure in 2027', speaker: 'Marcus Sterling' },
      { time: '02:00 PM', title: 'Hands-on Labs: Multi-Agent Workflows' },
      { time: '04:30 PM', title: 'Closing Panel & Networking Reception' }
    ]
  },
  {
    id: 'evt-music-1',
    title: 'Neon Horizons Indie & Electronic Fest',
    shortDescription: 'An electrifying sunset-to-midnight sonic journey featuring top breakthrough indie artists.',
    description: 'Experience an unforgettable audio-visual celebration featuring live synthesizer sets, organic indie rock performances, and immersive digital stage installations. Enjoy artisan food trucks, visual projection art, and high-fidelity sound under the stars.',
    category: 'Music',
    date: '2026-10-22',
    startTime: '05:00 PM',
    endTime: '11:30 PM',
    venue: 'Riverfront Amphitheater, Pier 42',
    location: 'Austin, TX',
    organizerName: 'Sonic Pulse Live',
    organizerEmail: 'fest@sonicpulsemusic.com',
    maxParticipants: 800,
    availableSeats: 112,
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    price: '$35',
    isFeatured: true,
    tags: ['Live Music', 'Electronic', 'Indie', 'Concert'],
    agenda: [
      { time: '05:00 PM', title: 'Gates Open & Acoustic Showcase' },
      { time: '06:30 PM', title: 'The Echo Drift (Indie Pop)' },
      { time: '08:15 PM', title: 'Kaelo Sun (Live Modular Synth)' },
      { time: '10:00 PM', title: 'Headline Act: Neon Meridian' }
    ]
  },
  {
    id: 'evt-workshop-1',
    title: 'Interactive UI/UX Design Masterclass',
    shortDescription: 'Master design systems, micro-interactions, and accessibility standards with Figma and Code.',
    description: 'A comprehensive, practitioner-led masterclass designed for designers and front-end developers aiming to craft polished, accessible, and delight-driven web experiences. Learn how to establish cohesive design tokens, prototype fluid micro-interactions, and conduct swift accessibility audits.',
    category: 'Workshops',
    date: '2026-11-05',
    startTime: '10:00 AM',
    endTime: '02:30 PM',
    venue: 'DesignHub Co-Working Loft, 4th Floor',
    location: 'Seattle, WA',
    organizerName: 'Pixel & Craft Guild',
    organizerEmail: 'hello@pixelandcraft.design',
    maxParticipants: 60,
    availableSeats: 9,
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    price: 'Free',
    isFeatured: true,
    tags: ['Design Systems', 'Figma', 'Accessibility', 'Interactive'],
    agenda: [
      { time: '10:00 AM', title: 'Token Architecture & Visual Foundations' },
      { time: '11:30 AM', title: 'Prototyping Physics & Micro-Gestures' },
      { time: '01:00 PM', title: 'WCAG AA Compliance Live Audit' },
      { time: '02:00 PM', title: 'Portfolio Critiques & Wrap-up' }
    ]
  },
  {
    id: 'evt-biz-1',
    title: 'Global Venture & Startup Pitch Expo',
    shortDescription: 'Watch 20 curated early-stage startups pitch to top angel investors and venture funds.',
    description: 'The premier quarterly gathering for founders, angel syndicates, and seed venture capitalists. Attendees will hear pitch presentations spanning clean-tech, health intelligence, enterprise tooling, and consumer fintech, accompanied by structured 1-on-1 networking lounges.',
    category: 'Business',
    date: '2026-10-30',
    startTime: '01:00 PM',
    endTime: '06:00 PM',
    venue: 'Financial Center Auditorium, 32nd Floor',
    location: 'New York, NY',
    organizerName: 'Apex Capital Ventures',
    organizerEmail: 'events@apexcap.ventures',
    maxParticipants: 220,
    availableSeats: 35,
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    price: '$49',
    isFeatured: false,
    tags: ['Startups', 'Venture Capital', 'Pitching', 'Networking'],
    agenda: [
      { time: '01:00 PM', title: 'Check-in & Networking Coffee' },
      { time: '01:45 PM', title: 'Cohort Pitch Block 1: Enterprise & AI' },
      { time: '03:15 PM', title: 'Intermission & Demo Stations' },
      { time: '04:00 PM', title: 'Cohort Pitch Block 2: Climate & Health' },
      { time: '05:15 PM', title: 'Awards & Investor Mixer' }
    ]
  },
  {
    id: 'evt-college-1',
    title: 'Inter-College Hackathon: HackNova 2026',
    shortDescription: '36 hours of non-stop building, mentoring, and prizes across 5 competitive tracks.',
    description: 'Gather your dream team of university developers, designers, and problem solvers! HackNova offers free food, energy drinks, hardware testbeds, and mentorship from senior engineers at top global technology companies. Over $15,000 in total bounties and prizes.',
    category: 'College',
    date: '2026-11-12',
    startTime: '08:30 AM',
    endTime: '08:00 PM',
    venue: 'University Student Union & Engineering Quad',
    location: 'Boston, MA',
    organizerName: 'Campus Developer Society',
    organizerEmail: 'hacknova@campusdev.edu',
    maxParticipants: 400,
    availableSeats: 86,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    price: 'Free',
    isFeatured: true,
    tags: ['Hackathon', 'Students', 'Coding', 'Prizes'],
    agenda: [
      { time: '08:30 AM', title: 'Team Registration & Hardware Kit Pickup' },
      { time: '09:30 AM', title: 'Opening Ceremony & Track Releases' },
      { time: '10:00 AM', title: 'Hacking Commences!' },
      { time: '02:00 PM', title: 'API Workshops & Mentor Hours' },
      { time: '06:00 PM', title: 'Project Submissions & Expo Judging' }
    ]
  },
  {
    id: 'evt-sports-1',
    title: 'City Marathon & Community 10K Run',
    shortDescription: 'Join thousands of runners along scenic waterfront boulevards and urban landmarks.',
    description: 'Lace up your running shoes for the annual City Marathon & 10K! Whether you are aiming for a personal record or enjoying an energetic community run with friends, our course offers flat, fast paved pathways, hydration checkpoints every 2km, and cheering zones throughout.',
    category: 'Sports',
    date: '2026-11-20',
    startTime: '06:30 AM',
    endTime: '12:00 PM',
    venue: 'Memorial Park Promenade & Waterfront Line',
    location: 'Chicago, IL',
    organizerName: 'Metro Athletics League',
    organizerEmail: 'race@metroathletics.org',
    maxParticipants: 1200,
    availableSeats: 194,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    price: '$20',
    isFeatured: false,
    tags: ['Running', 'Marathon', 'Fitness', 'Community'],
    agenda: [
      { time: '06:00 AM', title: 'Bib Collection & Warm-up Drills' },
      { time: '06:45 AM', title: 'Wave 1 Start: Marathon Elite' },
      { time: '07:15 AM', title: 'Wave 2 Start: 10K Community Run' },
      { time: '10:30 AM', title: 'Medal Ceremony & Finish Festival' }
    ]
  },
  {
    id: 'evt-arts-1',
    title: 'Lumina Contemporary Art & Light Gala',
    shortDescription: 'An experiential evening of projection-mapped murals, kinetic sculptures, and acoustic live strings.',
    description: 'Immerse your senses in a night of contemporary expression where light, sound, and architectural spaces collide. Featuring original works by 18 international visual creators, ambient live cello performances, and organic artisan wine pairings.',
    category: 'Arts & Culture',
    date: '2026-12-04',
    startTime: '06:30 PM',
    endTime: '10:30 PM',
    venue: 'The Atrium Center for Contemporary Art',
    location: 'Denver, CO',
    organizerName: 'Curators Collective',
    organizerEmail: 'info@luminaarts.org',
    maxParticipants: 180,
    availableSeats: 22,
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    price: '$15',
    isFeatured: true,
    tags: ['Art Exhibition', 'Light Art', 'Sculpture', 'Performance'],
    agenda: [
      { time: '06:30 PM', title: 'Champagne Reception & Gallery Walk' },
      { time: '07:45 PM', title: 'Kinetic Sculpture Demonstration' },
      { time: '08:30 PM', title: 'Acoustic Strings & Projection Synchrony' },
      { time: '09:45 PM', title: 'Artist Dialogue & Silent Auction' }
    ]
  },
  {
    id: 'evt-tech-2',
    title: 'Full-Stack Web & Microservices Bootcamp',
    shortDescription: 'A practical, zero-to-one workshop on TypeScript, modern serverless backends, and deployment.',
    description: 'Dive into full-stack engineering practices with industry veterans. Discover how to architect reliable edge applications, handle concurrency, secure your APIs, and implement real-time client state with optimal bundle performance.',
    category: 'Workshops',
    date: '2026-10-18',
    startTime: '11:00 AM',
    endTime: '04:00 PM',
    venue: 'Coders Campus Learning Lab, Suite 200',
    location: 'San Jose, CA',
    organizerName: 'CodeCraft Society',
    organizerEmail: 'workshops@codecraft.io',
    maxParticipants: 80,
    availableSeats: 14,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    price: 'Free',
    isFeatured: false,
    tags: ['Web Dev', 'TypeScript', 'Backend', 'Interactive'],
    agenda: [
      { time: '11:00 AM', title: 'Architecture Patterns for Modern Web' },
      { time: '12:30 PM', title: 'Lunch & Peer Code Review' },
      { time: '01:30 PM', title: 'Building Resilient APIs Hands-on' },
      { time: '03:15 PM', title: 'Edge Deployment & Observability' }
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@eventra.io',
  phone: '+1 (555) 234-5678',
  organization: 'Stanford University & Tech Guild',
  bio: 'Passionate event coordinator, developer, and lifelong learner eager to connect through inspiring workshops and summits.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  interests: ['Technology', 'Workshops', 'College', 'Arts & Culture']
};

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-sample-1',
    eventId: 'evt-tech-1',
    eventTitle: 'NextGen AI & Cloud Summit 2026',
    eventDate: '2026-10-14',
    eventTime: '09:00 AM - 05:30 PM',
    eventVenue: 'Silicon Hall & Grand Ballroom, Civic Center',
    eventLocation: 'San Francisco, CA',
    eventImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    eventCategory: 'Technology',
    fullName: 'Alex Morgan',
    email: 'alex.morgan@eventra.io',
    phoneNumber: '+1 (555) 234-5678',
    organization: 'Stanford University',
    registeredAt: '2026-09-18T14:30:00.000Z',
    ticketId: 'EVT-98412',
    status: 'confirmed'
  }
];

export const CATEGORY_METADATA: Record<string, { label: string; iconName: string; color: string; bg: string; border: string }> = {
  Technology: {
    label: 'Technology',
    iconName: 'Cpu',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200'
  },
  Music: {
    label: 'Music',
    iconName: 'Music',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200'
  },
  Workshops: {
    label: 'Workshops',
    iconName: 'Wrench',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  Business: {
    label: 'Business',
    iconName: 'Briefcase',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200'
  },
  College: {
    label: 'College',
    iconName: 'GraduationCap',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200'
  },
  Sports: {
    label: 'Sports',
    iconName: 'Trophy',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200'
  },
  'Arts & Culture': {
    label: 'Arts & Culture',
    iconName: 'Palette',
    color: 'text-stone-800',
    bg: 'bg-stone-100',
    border: 'border-stone-200'
  }
};
