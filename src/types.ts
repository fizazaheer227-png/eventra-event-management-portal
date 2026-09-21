export type EventCategory = 
  | 'Technology' 
  | 'Music' 
  | 'Workshops' 
  | 'Business' 
  | 'College' 
  | 'Sports' 
  | 'Arts & Culture';

export interface EventItem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "10:00 AM"
  endTime: string; // e.g. "04:00 PM"
  venue: string;
  location: string;
  organizerName: string;
  organizerEmail?: string;
  maxParticipants: number;
  availableSeats: number;
  imageUrl: string;
  price: string; // "Free" or "$25" etc.
  isFeatured?: boolean;
  isCreatedByUser?: boolean;
  tags?: string[];
  agenda?: {
    time: string;
    title: string;
    speaker?: string;
  }[];
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventLocation: string;
  eventImageUrl: string;
  eventCategory: EventCategory;
  fullName: string;
  email: string;
  phoneNumber: string;
  organization?: string;
  registeredAt: string;
  ticketId: string;
  status: 'confirmed' | 'cancelled';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  organization: string;
  bio: string;
  avatarUrl: string;
  interests: EventCategory[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type ViewType = 
  | 'home' 
  | 'explore' 
  | 'details' 
  | 'my-events' 
  | 'create' 
  | 'edit' 
  | 'profile';
