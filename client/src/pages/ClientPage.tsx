import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Heart, MapPin, Phone, Mail, Calendar, Users } from "lucide-react";
import { cars, getBrands, getDaysBetween, calculateTotalPrice, Car } from "@/lib/carData";
import { useCarContext } from "@/contexts/CarContext";
import { sendReservationForm } from "@/lib/formService";
import { nanoid } from "nanoid";

export default function ClientPage() {
  const [, navigate] = useLocation();
  const { addReservation, isCarAvailable, addFavorite, removeFavorite, isFavorite } = useCarContext();

  // État du catalogue
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // État du formulaire de réservation
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    pickupDate: "",
    returnDate: "",
  });

  // Filtrer les voitures
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const brandMatch = selectedBrand === "all" || car.brand === selectedBrand;
      const categoryMatch = selectedCategory === "all" || car.category === selectedCategory;
      return brandMatch && categoryMatch;
    });
  }, [selectedBrand, selectedCategory]);

  // Marques disponibles
  const brands = getBrands();

  // Ouvrir la réservation
  const handleReserveClick = (car: Car) => {
    setSelectedCar(car);
    setIsReservationOpen(true);
  };

  // Soumettre la réservation
  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCar || !formData.pickupDate || !formData.returnDate) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (new Date(formData.pickupDate) >= new Date(formData.returnDate)) {
      toast.error("La date de retour doit être après la date de prise en charge");
      return;
    }

    // Vérifier la disponibilité
    if (!isCarAvailable(selectedCar.id, formData.pickupDate, formData.returnDate)) {
      toast.error("Cette voiture n'est pas disponible pour ces dates");
      return;
    }

    const days = getDaysBetween(formData.pickupDate, formData.returnDate);
    const totalPrice = calculateTotalPrice(selectedCar.pricePerDay, days);

    const reservation = {
      id: nanoid(),
      carId: selectedCar.id,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      clientAddress: formData.clientAddress,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      totalDays: days,
      totalPrice,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    // Ajouter la réservation
    addReservation(reservation);

    // Envoyer le formulaire à l'admin
    try {
      const sent = await sendReservationForm(reservation, selectedCar);
      if (sent) {
        toast.success("Réservation confirmée ! Nous avons reçu votre demande.");
      } else {
        toast.error("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }

    // Réinitialiser le formulaire
    setFormData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientAddress: "",
      pickupDate: "",
      returnDate: "",
    });
    setIsReservationOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#f8f9fa]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#2a3050] z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-[#1a1f3a] rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-[#d4af37]" />
            </button>
            <h1 className="text-2xl font-bold text-[#d4af37]">Catalogue</h1>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Filtres */}
          <div className="bg-[#1a1f3a] p-6 rounded-lg border border-[#2a3050] mb-8 grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#d4af37] mb-2">Marque</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f3a] border-[#2a3050]">
                  <SelectItem value="all">Toutes les marques</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#d4af37] mb-2">Catégorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f3a] border-[#2a3050]">
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="sedan">Berline</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="sport">Sport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-[#a0a0a0]">
                {filteredCars.length} véhicule{filteredCars.length !== 1 ? "s" : ""} trouvé{filteredCars.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Grille de voitures */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div key={car.id} className="car-card group">
                {/* Image */}
                <div className="car-card-image">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="car-card-overlay">
                    <div className="w-full">
                      <button
                        onClick={() => handleReserveClick(car)}
                        className="w-full btn-luxury"
                      >
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-[#f8f9fa]">{car.brand}</h3>
                      <p className="text-sm text-[#a0a0a0]">{car.model}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (isFavorite(car.id)) {
                          removeFavorite(car.id);
                          toast.success("Retiré des favoris");
                        } else {
                          addFavorite(car.id);
                          toast.success("Ajouté aux favoris");
                        }
                      }}
                      className="p-2 hover:bg-[#2a3050] rounded-lg transition-colors"
                    >
                      <Heart
                        size={20}
                        className={isFavorite(car.id) ? "text-[#d4af37] fill-[#d4af37]" : "text-[#d4af37]"}
                      />
                    </button>
                  </div>

                  {/* Caractéristiques */}
                  <div className="space-y-2 mb-4 text-sm text-[#a0a0a0]">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#00d9ff]" />
                      <span>{car.seats} places</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#2a3050] px-2 py-1 rounded">
                        {car.transmission === "automatic" ? "Automatique" : "Manuelle"}
                      </span>
                      <span className="text-xs bg-[#2a3050] px-2 py-1 rounded">
                        {car.fuel === "electric" ? "Électrique" : car.fuel === "hybrid" ? "Hybride" : car.fuel === "diesel" ? "Diesel" : "Essence"}
                      </span>
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="border-t border-[#2a3050] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#a0a0a0]">À partir de</span>
                      <span className="text-2xl font-bold text-[#d4af37]">
                        {car.pricePerDay}€
                        <span className="text-sm text-[#a0a0a0]">/jour</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#a0a0a0] text-lg">Aucune voiture ne correspond à vos critères</p>
            </div>
          )}
        </div>
      </main>

      {/* Dialog de réservation */}
      <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
        <DialogContent className="bg-[#1a1f3a] border-[#2a3050] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#f8f9fa]">
              Réserver {selectedCar?.brand} {selectedCar?.model}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitReservation} className="space-y-4">
            {/* Informations personnelles */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#d4af37]">Vos informations</h3>

              <div>
                <label className="text-xs text-[#a0a0a0] mb-1 block">Nom complet</label>
                <Input
                  type="text"
                  placeholder="Nom Complet"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa] placeholder-[#a0a0a0]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#a0a0a0] mb-1 block">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa] placeholder-[#a0a0a0]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#a0a0a0] mb-1 block">Téléphone</label>
                <Input
                  type="tel"
                  placeholder="+212 6 12 34 56 78"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa] placeholder-[#a0a0a0]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#a0a0a0] mb-1 block">Adresse</label>
                <Input
                  type="text"
                  placeholder="Hay mouhamadi, Casablanca"
                  value={formData.clientAddress}
                  onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                  className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa] placeholder-[#a0a0a0]"
                  required
                />
              </div>
            </div>

            {/* Dates de location */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#d4af37]">Dates de location</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#a0a0a0] mb-1 block">Prise en charge</label>
                  <Input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-[#a0a0a0] mb-1 block">Retour</label>
                  <Input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="bg-[#0a0e27] border-[#2a3050] text-[#f8f9fa]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Résumé du prix */}
            {formData.pickupDate && formData.returnDate && selectedCar && (
              <div className="bg-[#0a0e27] p-4 rounded-lg border border-[#2a3050]">
                <div className="flex justify-between mb-2">
                  <span className="text-[#a0a0a0]">Prix par jour:</span>
                  <span className="text-[#d4af37]">{selectedCar.pricePerDay}€</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[#a0a0a0]">Nombre de jours:</span>
                  <span className="text-[#d4af37]">{getDaysBetween(formData.pickupDate, formData.returnDate)}</span>
                </div>
                <div className="border-t border-[#2a3050] pt-2 flex justify-between">
                  <span className="font-semibold text-[#f8f9fa]">Total:</span>
                  <span className="text-2xl font-bold text-[#d4af37]">
                    {calculateTotalPrice(selectedCar.pricePerDay, getDaysBetween(formData.pickupDate, formData.returnDate))}€
                  </span>
                </div>
              </div>
            )}

            {/* Boutons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsReservationOpen(false)}
                className="flex-1 border-[#2a3050] text-[#f8f9fa] hover:bg-[#1a1f3a]"
              >
                Annuler
              </Button>
              <button
                type="submit"
                className="flex-1 btn-luxury"
              >
                Confirmer la Réservation
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
