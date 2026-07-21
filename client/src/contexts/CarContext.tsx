import React, { createContext, useContext, useState, useEffect } from "react";
import { Reservation, CarAvailability } from "@/lib/carData";

interface CarContextType {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  getReservationsByCarId: (carId: string) => Reservation[];
  
  availability: CarAvailability[];
  updateAvailability: (carId: string, unavailableDates: string[]) => void;
  isCarAvailable: (carId: string, startDate: string, endDate: string) => boolean;
  
  favorites: string[];
  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [availability, setAvailability] = useState<CarAvailability[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Charger les données du localStorage au montage
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Sauvegarder les données dans le localStorage
  useEffect(() => {
    saveToStorage();
  }, [reservations, availability, favorites]);

  const loadFromStorage = () => {
    try {
      const storedReservations = localStorage.getItem("lux-drive-reservations");
      const storedAvailability = localStorage.getItem("lux-drive-availability");
      const storedFavorites = localStorage.getItem("lux-drive-favorites");

      if (storedReservations) {
        setReservations(JSON.parse(storedReservations));
      }
      if (storedAvailability) {
        setAvailability(JSON.parse(storedAvailability));
      }
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  const saveToStorage = () => {
    try {
      localStorage.setItem("lux-drive-reservations", JSON.stringify(reservations));
      localStorage.setItem("lux-drive-availability", JSON.stringify(availability));
      localStorage.setItem("lux-drive-favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données:", error);
    }
  };

  const addReservation = (reservation: Reservation) => {
    setReservations((prev) => [...prev, reservation]);
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, ...updates } : res))
    );
  };

  const deleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  const getReservationsByCarId = (carId: string): Reservation[] => {
    return reservations.filter((res) => res.carId === carId);
  };

  const updateAvailability = (carId: string, unavailableDates: string[]) => {
    setAvailability((prev) => {
      const existing = prev.find((a) => a.carId === carId);
      if (existing) {
        return prev.map((a) =>
          a.carId === carId
            ? { ...a, unavailableDates, lastUpdated: new Date().toISOString() }
            : a
        );
      } else {
        return [
          ...prev,
          {
            carId,
            unavailableDates,
            lastUpdated: new Date().toISOString(),
          },
        ];
      }
    });
  };

  const isCarAvailable = (carId: string, startDate: string, endDate: string): boolean => {
    const carAvailability = availability.find((a) => a.carId === carId);
    if (!carAvailability) return true;

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      if (carAvailability.unavailableDates.includes(dateStr)) {
        return false;
      }
    }

    return true;
  };

  const addFavorite = (carId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(carId)) {
        return [...prev, carId];
      }
      return prev;
    });
  };

  const removeFavorite = (carId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== carId));
  };

  const isFavorite = (carId: string): boolean => {
    return favorites.includes(carId);
  };

  return (
    <CarContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservation,
        deleteReservation,
        getReservationsByCarId,
        availability,
        updateAvailability,
        isCarAvailable,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        loadFromStorage,
        saveToStorage,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCarContext doit être utilisé dans un CarProvider");
  }
  return context;
};
