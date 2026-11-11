import React, { createContext, useState, useContext, ReactNode } from "react";
import { TripEvent } from "../types";

interface TripContextType {
  trips: TripEvent[];
  addTrip: (trip: TripEvent) => void;
  deleteTrip: (id: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const INITIAL_TRIPS: TripEvent[] = [
  {
    id: "1",
    title: "Weekend in Kyoto",
    date: new Date("2026-11-15"),
    notes: "Book Shinkansen tickets beforehand.",
    location: { name: "Kiyomizu-dera", latitude: 34.9948, longitude: 135.785 },
    // Injecting our timeline data here:
    itinerary: [
      {
        id: "101",
        time: new Date("2026-11-15T10:00:00"),
        title: "Flight to KIX",
        category: "flight",
      },
      {
        id: "102",
        time: new Date("2026-11-15T14:00:00"),
        title: "Check-in at Ryokan",
        category: "lodging",
      },
      {
        id: "103",
        time: new Date("2026-11-15T18:30:00"),
        title: "Kaiseki Dinner",
        category: "dining",
      },
      {
        id: "104",
        time: new Date("2026-11-16T09:00:00"),
        title: "Fushimi Inari Shrine",
        category: "activity",
      },
    ],
  },
  {
    id: "2",
    title: "Palawan Beach Getaway",
    date: new Date("2026-12-10"),
    notes: "Bring snorkeling gear.",
    location: { name: "El Nido", latitude: 11.1784, longitude: 119.3956 },
  },
  {
    id: "3",
    title: "Cebu Code Camp",
    date: new Date("2026-11-20"),
    notes: "Work on React Native internship project.",
    location: { name: "Cebu IT Park", latitude: 10.3283, longitude: 123.9058 },
  },
];

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<TripEvent[]>(INITIAL_TRIPS);

  const addTrip = (newTrip: TripEvent) =>
    setTrips((prev) => [...prev, newTrip]);
  const deleteTrip = (id: string) =>
    setTrips((prev) => prev.filter((trip) => trip.id !== id));

  return (
    <TripContext.Provider value={{ trips, addTrip, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined)
    throw new Error("useTrips must be used within a TripProvider");
  return context;
}
