import React, { createContext, useState, useContext, ReactNode } from "react";
import { TripEvent } from "../types";

// Define the shape of our context
interface TripContextType {
  trips: TripEvent[];
  // We are putting these here now so we can use them later when building the Add/Edit forms
  addTrip: (trip: TripEvent) => void;
  deleteTrip: (id: string) => void;
}

// Create the context with a default undefined value
const TripContext = createContext<TripContextType | undefined>(undefined);

// Define the initial state (our mock data)
const INITIAL_TRIPS: TripEvent[] = [
  {
    id: "1",
    title: "Weekend in Kyoto",
    date: new Date("2026-11-15"),
    notes: "Book Shinkansen tickets beforehand.",
  },
  {
    id: "2",
    title: "Palawan Beach Getaway",
    date: new Date("2026-12-10"),
    notes: "Bring snorkeling gear.",
  },
];

// The Provider component that will wrap our application
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

// Custom hook to make importing the context cleaner in our screens
export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrips must be used within a TripProvider");
  }
  return context;
}
