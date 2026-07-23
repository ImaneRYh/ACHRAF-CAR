// Données des voitures avec images locales pour Achraf Car Rental
const BASE = import.meta.env.BASE_URL;

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: "sedan" | "suv" | "sport";
  year: number;
  pricePerDay: number; // en euros
  image: string;
  features: string[];
  seats: number;
  transmission: "automatic" | "manual";
  fuel: "electric" | "hybrid" | "diesel" | "petrol";
  description: string;
}

export interface Reservation {
  id: string;
  carId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  pickupDate: string;
  returnDate: string;
  totalDays: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface CarAvailability {
  carId: string;
  unavailableDates: string[]; // ISO format dates
  lastUpdated: string;
}

// Catalogue de voitures Achraf Car Rental
export const cars: Car[] = [
  // RENAULT
  {
    id: "renault-clio-manual",
    brand: "Renault",
    model: "Clio Manuelle",
    category: "sedan",
    year: 2023,
    pricePerDay: 40,
    image: `${BASE}cars/Clio Manuelle et auto.jpeg`,
    features: ["Climatisation", "Direction assistée", "Économe en carburant", "Facile à conduire"],
    seats: 5,
    transmission: "manual",
    fuel: "diesel",
    description: "Petite voiture pratique et économique pour la ville",
  },
  {
    id: "renault-clio-auto",
    brand: "Renault",
    model: "Clio Automatique",
    category: "sedan",
    year: 2023,
    pricePerDay: 40,
    image: `${BASE}cars/Clio Manuelle et auto.jpeg`,
    features: ["Climatisation", "Boîte automatique", "Économe", "Confortable"],
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    description: "Clio avec boîte automatique pour plus de confort",
  },
  {
    id: "dacia-duster",
    brand: "Dacia",
    model: "Duster",
    category: "suv",
    year: 2023,
    pricePerDay: 50,
    image: `${BASE}cars/dacia duster.jpeg`,
    features: ["4x4", "Traction intégrale", "Spacieux", "Robuste"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV compact robuste et polyvalent pour tous les terrains",
  },
  {
    id: "dacia-sandero-manual",
    brand: "Dacia",
    model: "Sandero Manuelle",
    category: "sedan",
    year: 2023,
    pricePerDay: 30,
    image: `${BASE}cars/dacia sanderomanuel.jpeg`,
    features: ["Spacieux", "Économique", "Fiable", "Pratique"],
    seats: 5,
    transmission: "manual",
    fuel: "petrol",
    description: "Berline familiale économique et spacieuse",
  },

  // HYUNDAI
  {
    id: "hyundai-creta",
    brand: "Hyundai",
    model: "Creta",
    category: "suv",
    year: 2024,
    pricePerDay: 55,
    image: `${BASE}cars/hyndaiCreta.jpeg`,
    features: ["Climatisation", "Écran tactile", "Sièges confortables", "Traction intégrale"],
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    description: "SUV compact moderne avec bon équipement",
  },
  {
    id: "hyundai-tucson",
    brand: "Hyundai",
    model: "Tucson",
    category: "suv",
    year: 2024,
    pricePerDay: 70,
    image: `${BASE}cars/hyandaiTucson.jpeg`,
    features: ["Traction intégrale", "Climatisation automatique", "Système audio", "Spacieux"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV familial spacieux avec technologie moderne",
  },

  // KIA
  {
    id: "kia-sportage",
    brand: "Kia",
    model: "Sportage",
    category: "suv",
    year: 2024,
    pricePerDay: 70,
    image: `${BASE}cars/kiaSportige.jpeg`,
    features: ["Traction intégrale", "Écran tactile", "Sièges chauffants", "Système audio premium"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV dynamique avec design moderne et équipements complets",
  },

  // VOLKSWAGEN
  {
    id: "vw-golf8-r",
    brand: "Volkswagen",
    model: "Golf 8 R",
    category: "sport",
    year: 2024,
    pricePerDay: 100,
    image: `${BASE}cars/golf8R.jpeg`,
    features: ["Moteur 4-cylindres turbo", "Traction intégrale", "Sièges sport", "Système audio premium"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "Voiture sport compacte avec performance et confort",
  },
  {
    id: "vw-t-roc",
    brand: "Volkswagen",
    model: "T-Roc",
    category: "suv",
    year: 2023,
    pricePerDay: 70,
    image: `${BASE}cars/T-roc.jpeg`,
    features: ["Design moderne", "Climatisation", "Système de navigation", "Spacieux"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV compact urbain avec design tendance",
  },
  {
    id: "vw-tiguan",
    brand: "Volkswagen",
    model: "Tiguan",
    category: "suv",
    year: 2024,
    pricePerDay: 100,
    image: `${BASE}cars/tiguan.jpeg`,
    features: ["Traction intégrale", "Climatisation automatique", "Toit panoramique", "Sièges confortables"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV familial allemand avec qualité et fiabilité",
  },
  {
    id: "vw-touareg-extreme",
    brand: "Volkswagen",
    model: "Touareg Extreme",
    category: "suv",
    year: 2024,
    pricePerDay: 140,
    image: `${BASE}cars/touaregExtreme.jpeg`,
    features: ["Moteur V6 turbo", "Traction intégrale", "Suspension pneumatique", "Intérieur premium"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV premium haut de gamme avec équipements luxe",
  },

  // CUPRA
  {
    id: "cupra-formentor",
    brand: "Cupra",
    model: "Cupra Formentor",
    category: "suv",
    year: 2026,
    pricePerDay: 70,
    image: `${BASE}cars/cupraFormentel.jpeg`,
    features: ["Moteur turbo", "Traction intégrale", "Sièges sport", "Design sportif"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV sportif avec design agressif et performance",
  },
  {
    id: "cupra-formentor-noir",
    brand: "Cupra",
    model: "Cupra Formentor Noir",
    category: "suv",
    year: 2025,
    pricePerDay: 70,
    image: `${BASE}cars/cupraFormentorNoir.jpeg`,
    features: ["Moteur turbo", "Traction intégrale", "Sièges sport premium", "Peinture noire brillante"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "Formentor en noir avec équipements premium",
  },

  // PORSCHE
  {
    id: "porsche-macan",
    brand: "Porsche",
    model: "Macan",
    category: "sport",
    year: 2024,
    pricePerDay: 200,
    image: `${BASE}cars/Porshe macan.jpeg`,
    features: ["Moteur turbo", "Traction intégrale", "Sièges sport chauffants", "Système Porsche Communication"],
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    description: "SUV sportif Porsche avec performance et luxe",
  },
  {
    id: "porsche-cayenne",
    brand: "Porsche",
    model: "Cayenne",
    category: "sport",
    year: 2024,
    pricePerDay: 350,
    image: `${BASE}cars/PorshecayennePrix350€.jpeg`,
    features: ["Moteur V8 turbo", "Traction intégrale", "Sièges chauffants massants", "Système audio premium"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV de luxe Porsche avec performance exceptionnelle",
  },

  // RANGE ROVER
  {
    id: "range-rover-evoque",
    brand: "Range Rover",
    model: "Evoque R Dynamic",
    category: "suv",
    year: 2024,
    pricePerDay: 140,
    image: `${BASE}cars/range evoque R dynamique.jpeg`,
    features: ["Traction intégrale", "Sièges chauffants", "Système de navigation", "Design moderne"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV compact de luxe avec design élégant",
  },
  {
    id: "range-rover-sport",
    brand: "Range Rover",
    model: "Range Rover Sport",
    category: "sport",
    year: 2024,
    pricePerDay: 350,
    image: `${BASE}cars/rangeroversport.jpeg`,
    features: ["Moteur V8", "Traction intégrale", "Sièges premium", "Système audio Meridian"],
    seats: 5,
    transmission: "automatic",
    fuel: "diesel",
    description: "SUV sportif de luxe avec performance et confort",
  },

  // HYUNDAI STARIA
  {
    id: "hyundai-staria-9",
    brand: "Hyundai",
    model: "Staria 9 places",
    category: "suv",
    year: 2023,
    pricePerDay: 120,
    image: `${BASE}cars/staria 9.jpeg`,
    features: ["9 places", "Spacieux", "Climatisation", "Portes coulissantes"],
    seats: 9,
    transmission: "automatic",
    fuel: "diesel",
    description: "Monospace spacieux pour les grands groupes",
  },

  // HYUNDAI ACCENT
  {
    id: "hyundai-accent",
    brand: "Hyundai",
    model: "Accent",
    category: "sedan",
    year: 2023,
    pricePerDay: 35,
    image: `${BASE}cars/accent.jpeg`,
    features: ["Climatisation", "Direction assistée", "Économe", "Fiable"],
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    description: "Berline compacte économique et fiable",
  },
];

// Fonction pour obtenir les voitures par marque
export const getCarsByBrand = (brand: string): Car[] => {
  return cars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase());
};

// Fonction pour obtenir les marques uniques
export const getBrands = (): string[] => {
  const brandsSet = new Set(cars.map((car) => car.brand));
  const brands = Array.from(brandsSet);
  return brands.sort();
};

// Fonction pour obtenir les voitures par catégorie
export const getCarsByCategory = (category: "sedan" | "suv" | "sport"): Car[] => {
  return cars.filter((car) => car.category === category);
};

// Fonction pour calculer le prix total
export const calculateTotalPrice = (pricePerDay: number, days: number): number => {
  return pricePerDay * days;
};

// Fonction pour obtenir le nombre de jours entre deux dates
export const getDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
