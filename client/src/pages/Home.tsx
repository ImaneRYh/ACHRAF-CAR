import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e27] text-[#f8f9fa]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#2a3050] z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.jpeg" 
              alt="Achraf Car" 
              className="h-10 w-10 rounded-full"
            />
            <span className="text-2xl font-bold text-[#d4af37]">ACHRAF CAR</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/client")}
              className="px-6 py-2 text-[#f8f9fa] hover:text-[#d4af37] transition-colors"
            >
              Réserver
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/cars/rangeroversport.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-[#f8f9fa]">
            Location de Voitures
            <span className="block text-[#d4af37] mt-2">de Qualité</span>
          </h1>
          <p className="text-xl text-[#a0a0a0] mb-8 max-w-2xl mx-auto">
            Découvrez notre collection de véhicules fiables et modernes. Du SUV familial à la voiture sportive, trouvez votre compagnon de route parfait.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/client")}
              className="btn-luxury flex items-center gap-2"
            >
              Réserver Maintenant <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0a0e27] border-t border-[#2a3050]">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#f8f9fa]">
            Pourquoi Choisir <span className="text-[#d4af37]">Achraf Car</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#1a1f3a] p-8 rounded-lg border border-[#2a3050] hover:border-[#d4af37] transition-colors group">
              <div className="mb-4 inline-block p-3 bg-[#d4af37]/10 rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                <Zap className="text-[#d4af37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#f8f9fa]">Véhicules de Qualité</h3>
              <p className="text-[#a0a0a0]">
                Accédez à une large sélection de véhicules bien entretenus et modernes pour tous vos besoins.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1a1f3a] p-8 rounded-lg border border-[#2a3050] hover:border-[#00d9ff] transition-colors group">
              <div className="mb-4 inline-block p-3 bg-[#00d9ff]/10 rounded-lg group-hover:bg-[#00d9ff]/20 transition-colors">
                <Shield className="text-[#00d9ff]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#f8f9fa]">Sécurité Garantie</h3>
              <p className="text-[#a0a0a0]">
                Tous nos véhicules sont assurés et régulièrement entretenus pour votre tranquillité d'esprit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1a1f3a] p-8 rounded-lg border border-[#2a3050] hover:border-[#d4af37] transition-colors group">
              <div className="mb-4 inline-block p-3 bg-[#d4af37]/10 rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                <Clock className="text-[#d4af37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#f8f9fa]">Réservation Facile</h3>
              <p className="text-[#a0a0a0]">
                Réservez en quelques clics et recevez une confirmation par email instantanément.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex-grow py-20 bg-gradient-to-r from-[#1a1f3a] to-[#0a0e27] border-t border-[#2a3050]">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#f8f9fa]">
            Prêt à Louer ? <span className="text-[#d4af37]">Achraf Car</span>
          </h2>
          <p className="text-xl text-[#a0a0a0] mb-8 max-w-2xl mx-auto">
            Découvrez notre collection complète et réservez votre véhicule dès aujourd'hui.
          </p>
          <button
            onClick={() => navigate("/client")}
            className="btn-luxury inline-flex items-center gap-2"
          >
            Commencer la Réservation <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#0a0e27] border-t border-[#2a3050] py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-[#d4af37] mb-4">À Propos</h4>
              <p className="text-[#a0a0a0] text-sm">
                Achraf Car est votre partenaire de confiance pour la location de véhicules de qualité.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#d4af37] mb-4">Services</h4>
              <ul className="space-y-2 text-[#a0a0a0] text-sm">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Réservation</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Catalogue</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">À Propos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#d4af37] mb-4">Contact</h4>
              <p className="text-[#a0a0a0] text-sm">
                Email: achraf.car.rental@gmail.com<br />
                Tél: +212 654 161 393
              </p>
            </div>
          </div>
          <div className="border-t border-[#2a3050] pt-8 text-center text-[#a0a0a0] text-sm">
            <p>&copy; 2026 Achraf Car. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
