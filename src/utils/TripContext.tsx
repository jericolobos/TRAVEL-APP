import React, { createContext, useState, useContext, ReactNode } from "react";
import { TripEvent } from "../types";

interface TripContextType {
  trips: TripEvent[];
  addTrip: (trip: TripEvent) => void;
  deleteTrip: (id: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

// Added the location object with coordinates to the initial data
const INITIAL_TRIPS: TripEvent[] = [
  {
    id: "1",
    title: "Weekend in Kyoto",
    date: new Date("2026-11-15"),
    notes: "Book Shinkansen tickets beforehand.",
    location: { name: "Kiyomizu-dera", latitude: 34.9948, longitude: 135.785 },
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

  const addTrip = (newTrip: TripEvent) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const deleteTrip = (id: string) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrips must be used within a TripProvider");
  }
  return context;
}
