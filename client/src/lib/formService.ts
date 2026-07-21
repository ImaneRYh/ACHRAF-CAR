import { Reservation, Car } from "./carData";

// Configuration Formspree
// Remplacez YOUR_FORM_ID par votre ID de formulaire Formspree
const FORMSPREE_FORM_ID = "meebrzkq"; // Ex: xyzabc123
const ADMIN_EMAIL = "imanerayhane5@gmail.com";

/**
 * Envoyer les données de réservation directement à l'admin via Formspree
 */
export const sendReservationForm = async (
  reservation: Reservation,
  car: Car | undefined
): Promise<boolean> => {
  if (!car) {
    console.error("Voiture non trouvée");
    return false;
  }

  // Préparer les données du formulaire
  const formData = new FormData();
  formData.append("email", ADMIN_EMAIL); // Email de destination
  formData.append("_replyto", reservation.clientEmail); // Email du client pour les réponses
  formData.append("_subject", `Nouvelle réservation - ${reservation.id}`);
  formData.append("_captcha", "false"); // Désactiver le captcha

  // Ajouter les informations du client
  formData.append("Nom du client", reservation.clientName);
  formData.append("Email du client", reservation.clientEmail);
  formData.append("Téléphone", reservation.clientPhone);
  formData.append("Adresse", reservation.clientAddress);

  // Ajouter les informations du véhicule
  formData.append("Véhicule", `${car.brand} ${car.model}`);
  formData.append("Prix par jour", `${car.pricePerDay}€`);

  // Ajouter les dates de réservation
  formData.append(
    "Prise en charge",
    new Date(reservation.pickupDate).toLocaleDateString("fr-FR")
  );
  formData.append(
    "Retour",
    new Date(reservation.returnDate).toLocaleDateString("fr-FR")
  );

  // Ajouter les détails de la réservation
  formData.append("Nombre de jours", reservation.totalDays.toString());
  formData.append("Prix total", `${reservation.totalPrice}€`);
  formData.append("ID de réservation", reservation.id);
  formData.append("Date de création", new Date(reservation.createdAt).toLocaleString("fr-FR"));

  try {
    console.log("📧 Envoi du formulaire de réservation...");

    // Envoyer via Formspree
    const response = await fetch(
      `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("✅ Formulaire envoyé avec succès !");

      // Sauvegarder dans le localStorage pour l'historique
      const formLog = localStorage.getItem("achraf-car-form-log") || "[]";
      const logs = JSON.parse(formLog);
      logs.push({
        timestamp: new Date().toISOString(),
        type: "reservation",
        clientName: reservation.clientName,
        clientEmail: reservation.clientEmail,
        vehicle: `${car.brand} ${car.model}`,
        reservationId: reservation.id,
        status: "sent",
      });
      localStorage.setItem("achraf-car-form-log", JSON.stringify(logs));

      return true;
    } else {
      console.error("❌ Erreur lors de l'envoi du formulaire:", response.status);

      // Sauvegarder l'erreur
      const formLog = localStorage.getItem("achraf-car-form-log") || "[]";
      const logs = JSON.parse(formLog);
      logs.push({
        timestamp: new Date().toISOString(),
        type: "reservation",
        clientName: reservation.clientName,
        clientEmail: reservation.clientEmail,
        vehicle: `${car.brand} ${car.model}`,
        reservationId: reservation.id,
        status: "error",
        errorCode: response.status,
      });
      localStorage.setItem("achraf-car-form-log", JSON.stringify(logs));

      return false;
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du formulaire:", error);

    // Sauvegarder l'erreur
    const formLog = localStorage.getItem("achraf-car-form-log") || "[]";
    const logs = JSON.parse(formLog);
    logs.push({
      timestamp: new Date().toISOString(),
      type: "reservation",
      clientName: reservation.clientName,
      clientEmail: reservation.clientEmail,
      vehicle: `${car.brand} ${car.model}`,
      reservationId: reservation.id,
      status: "error",
      error: error instanceof Error ? error.message : "Erreur inconnue",
    });
    localStorage.setItem("achraf-car-form-log", JSON.stringify(logs));

    return false;
  }
};

/**
 * Obtenir l'historique des formulaires envoyés
 */
export const getFormLog = (): any[] => {
  const formLog = localStorage.getItem("achraf-car-form-log") || "[]";
  return JSON.parse(formLog);
};

/**
 * Effacer l'historique des formulaires
 */
export const clearFormLog = (): void => {
  localStorage.removeItem("achraf-car-form-log");
};
