export interface Location {
    latitude: number;
    longitude: number;
    name: string;
  }
  
  // 1. Define the allowed categories for itinerary events
  export type EventCategory = 'flight' | 'lodging' | 'activity' | 'dining';
  
  // 2. Define the structure of a single timeline event
  export interface TimelineEvent {
    id: string;
    time: Date;
    title: string;
    category: EventCategory;
    notes?: string;
  }
  
  // 3. Attach the itinerary array to our main TripEvent
  export interface TripEvent {
    id: string;
    title: string;
    date: Date;
    location?: Location;
    notes?: string;
    itinerary?: TimelineEvent[]; // This is new
  }