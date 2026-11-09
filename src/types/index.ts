export interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

export interface TripEvent {
  id: string;
  title: string;
  date: Date;
  location?: Location;
  notes?: string;
}
