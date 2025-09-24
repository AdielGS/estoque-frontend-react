import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Mail, Star, Users, Clock, Wifi, Car, Coffee, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const attractions = [
    {
      id: 1,
      name: "Tobogã Radical",
      category: "radical",
      image: "https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?w=400&h=300&fit=crop",
      description: "Adrenalina pura em nosso tobogã de 25 metros de altura!"
    },
    {
      id: 2,
      name: "Piscina da Família",
      category: "família",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
      description: "Diversão segura para toda a família com profundidade variável."
    },
    {
      id: 3,
      name: "Rio Lento",
      category: "relaxamento",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop",
      description: "Relaxe e aproveite um passeio tranquilo em nosso rio artificial."
    },
    {
      id: 4,
      name: "Área Kids",
      category: "família",
      image: "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?w=400&h=300&fit=crop",
      description: "Playground aquático especialmente projetado para crianças."
    }
  ];

  const promotions = [
    {
      title: "Combo Família",
      price: "R$ 120,00",
      originalPrice: "R$ 160,00",
      description: "2 adultos + 2 crianças até 12 anos",
      highlight: true
    },
    {
      title: "Ingresso Individual",
      price: "R$ 45,00",
      originalPrice: "R$ 55,00",
      description: "Válido para qualquer dia da semana"
    },
    {
      title: "Pacote Hospedagem",
      price: "R$ 280,00",
      originalPrice: "R$ 350,00",
      description: "1 diária + 2 ingressos + café da manhã"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">
            Clube<span className="text-orange-400">Satelite</span>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <a href="#atrações" className="text-blue-900 hover:text-orange-400 transition-colors">Atrações</a>
            <a href="#ingressos" className="text-blue-900 hover:text-orange-400 transition-colors">Ingressos</a>
            <a href="#hospedagem" className="text-blue-900 hover:text-orange-400 transition-colors">Hospedagem</a>
            <a href="#contato" className="text-blue-900 hover:text-orange-400 transition-colors">Contato</a>
          </nav>
            <Link to="/login" className="hidden md:inline-block bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-full font-semibold transition-colors">
      Acessar Sistema
    </Link>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-900 hover:text-orange-400"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-4 space-y-4">
              <a href="#atrações" className="block text-blue-900 hover:text-orange-400">Atrações</a>
              <a href="#ingressos" className="block text-blue-900 hover:text-orange-400">Ingressos</a>
              <a href="#hospedagem" className="block text-blue-900 hover:text-orange-400">Hospedagem</a>
              <a href="#contato" className="block text-blue-900 hover:text-orange-400">Contato</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565031491910-e57fac031c41?w=1200&h=800&fit=crop')"
          }}
        ></div>
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-pulse">
            Diversão Sem Limites!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            atrações para toda família
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Comprar Ingresso
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Ver Atrações
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Date Selection */}
      <section className="py-8 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Escolha sua Data</h2>
              <p className="text-gray-600">Selecione o dia da sua visita e garante sua diversão</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="flex items-center space-x-2">
                <Calendar className="text-orange-400" />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-orange-400 outline-none"
                />
              </div>
              <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Verificar Disponibilidade
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section id="atrações" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Nossas Atrações</h2>
            <p className="text-gray-600 text-lg">Diversão garantida para todas as idades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={attraction.image} 
                      alt={attraction.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        attraction.category === 'radical' ? 'bg-red-500 text-white' :
                        attraction.category === 'família' ? 'bg-green-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {attraction.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{attraction.name}</h3>
                    <p className="text-gray-600">{attraction.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section id="ingressos" className="py-16 bg-blue-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ofertas Especiais</h2>
            <p className="text-blue-200 text-lg">Aproveite nossos preços promocionais por tempo limitado!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <div key={index} className={`relative ${promo.highlight ? 'transform scale-105' : ''}`}>
                <div className={`bg-white rounded-2xl p-8 shadow-xl ${promo.highlight ? 'border-4 border-orange-400' : ''}`}>
                  {promo.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold">
                        MAIS POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">{promo.title}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-orange-400">{promo.price}</span>
                      {promo.originalPrice && (
                        <span className="text-gray-500 line-through ml-2">{promo.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-6">{promo.description}</p>
                    <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      promo.highlight 
                        ? 'bg-orange-400 hover:bg-orange-500 text-white' 
                        : 'border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white'
                    }`}>
                      Comprar Agora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospedagem */}
      <section id="hospedagem" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Complete sua Experiência</h2>
              <p className="text-gray-600 text-lg mb-8">
                Hospede-se em nosso hotel e aproveite ao máximo sua visita ao parque. 
                Quartos confortáveis, café da manhã incluso e acesso exclusivo às atrações.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Wifi className="text-orange-400 w-5 h-5" />
                  <span className="text-gray-700">WiFi gratuito em todo hotel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="text-orange-400 w-5 h-5" />
                  <span className="text-gray-700">Estacionamento gratuito</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Coffee className="text-orange-400 w-5 h-5" />
                  <span className="text-gray-700">Café da manhã incluso</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="text-orange-400 w-5 h-5" />
                  <span className="text-gray-700">Quartos familiares disponíveis</span>
                </div>
              </div>
              
              <button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Fazer Reserva
              </button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop" 
                alt="Hotel"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="text-orange-400 fill-current w-5 h-5" />
                  <Star className="text-orange-400 fill-current w-5 h-5" />
                  <Star className="text-orange-400 fill-current w-5 h-5" />
                  <Star className="text-orange-400 fill-current w-5 h-5" />
                  <Star className="text-orange-400 fill-current w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600 mt-1">Avaliação 5.0 - 250+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Horário de Funcionamento</h3>
              <p className="text-gray-600">Seg - Sex: 9h às 18h</p>
              <p className="text-gray-600">Sáb - Dom: 8h às 19h</p>
            </div>
            
            <div className="text-center">
              <MapPin className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Localização</h3>
              <p className="text-gray-600">Rodovia BR-101, km 45</p>
              <p className="text-gray-600">Suzano - SP</p>
            </div>
            
            <div className="text-center">
              <Phone className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Contato</h3>
              <p className="text-gray-600">(11) 4567-8900</p>
              <p className="text-gray-600">contato@Clube Satelite.com.br</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">O que nossos visitantes dizem</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Lugar incrível para passar o dia com a família! As crianças se divertiram muito 
                e nós adultos também. Voltaremos com certeza!"
              </p>
              <p className="font-semibold text-blue-900">Maria Silva - Família</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
                <Star className="text-orange-400 fill-current w-5 h-5" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                "O tobogã radical é sensacional! Instalações limpas, funcionários atenciosos 
                e preços justos. Recomendo demais!"
              </p>
              <p className="font-semibold text-blue-900">João Santos - Jovem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                Satelite<span className="text-orange-400">Park</span>
              </div>
              <p className="text-blue-200">
                O maior parque aquático da região com diversão garantida para toda família.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#atrações" className="hover:text-white transition-colors">Atrações</a></li>
                <li><a href="#ingressos" className="hover:text-white transition-colors">Ingressos</a></li>
                <li><a href="#hospedagem" className="hover:text-white transition-colors">Hospedagem</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Informações</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Regulamentos</li>
                <li>Política de Privacidade</li>
                <li>Termos de Uso</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-blue-200">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(11) 4567-8900</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@Clube Satelite.com.br</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Rodovia BR-101, km 45</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2025 Clube Satelite. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110">
          <Phone className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;