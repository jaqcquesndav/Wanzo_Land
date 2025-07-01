import MapRDC from '../../assets/images/MapRDC.svg?react';
import { useState, useRef, useEffect } from 'react';

export function RDCitiesMap() {
  // Coordonnées ajustées et statut opérationnel
  const cities = [
    { name: 'Kinshasa', x: 280, y: 620, active: true },
    { name: 'Lubumbashi', x: 930, y: 1040, active: true },
    { name: 'Goma', x: 1025, y: 455, active: false },
    { name: 'Butembo', x: 1025, y: 360, active: true },
    { name: 'Bukavu', x: 1010, y: 510, active: false },
    { name: 'Kisangani', x: 810, y: 330, active: false },
    { name: 'Kananga', x: 570, y: 720, active: false },
    { name: 'Mbuji-Mayi', x: 700, y: 770, active: true },
    { name: 'Bunia', x: 1075, y: 290, active: false },
    { name: 'Beni', x: 1035, y: 330, active: true },
    { name: 'Matadi', x: 200, y: 680, active: false },
    { name: 'Kolwezi', x: 810, y: 980, active: false },
    { name: 'Mbandaka', x: 470, y: 360, active: false },
  ];

  const [hoveredCity, setHoveredCity] = useState(null as null | typeof cities[0]);
  const [hoveredProvince, setHoveredProvince] = useState("");
  const mapRef = useRef<SVGSVGElement>(null);
  
  // Configuration des couleurs du thème
  const colors = {
    mapFill: '#e2e8f0', // Gris clair pour le fond de carte
    provinceDefault: '#e2e8f0', // Couleur de province par défaut (gris)
    provinceHover: '#cbd5e1', // Couleur au survol d'une province (gris plus foncé)
    activeCity: '#22c55e', // Vert pour les villes actives (Wanzo opérationnel)
    inactiveCity: '#f97316', // Orange pour les villes inactives (à venir)
    textColor: '#1e293b', // Couleur de texte foncée
    borderColor: '#94a3b8' // Couleur de bordure grise
  };

  // Effet pour configurer les interactions avec les provinces du SVG
  useEffect(() => {
    if (mapRef.current) {
      // Sélection des éléments du SVG après qu'il soit chargé
      const svgElement = mapRef.current;
      
      // Configurer le fond du SVG (élément racine)
      const rootSvg = svgElement.querySelector('svg');
      if (rootSvg) {
        rootSvg.style.backgroundColor = colors.mapFill;
        // Configurer les attributs globaux du SVG pour correspondre au thème fourni
        rootSvg.setAttribute('stroke', colors.borderColor);
        rootSvg.setAttribute('stroke-linecap', 'round');
        rootSvg.setAttribute('stroke-linejoin', 'round');
        rootSvg.setAttribute('stroke-width', '0.8');
      }
      
      // Configurer les provinces (les paths)
      const paths = svgElement.querySelectorAll('path');
      
      paths.forEach((path) => {
        // Ajouter les événements et styles aux provinces
        path.setAttribute('fill', colors.provinceDefault);
        path.setAttribute('stroke', colors.borderColor);
        path.setAttribute('stroke-width', '0.8');
        path.style.cursor = 'pointer';
        path.style.transition = 'fill 0.2s ease';
        
        path.addEventListener('mouseenter', () => {
          path.setAttribute('fill', colors.provinceHover);
          setHoveredProvince(path.getAttribute('id') || path.getAttribute('name') || "");
        });
        
        path.addEventListener('mouseleave', () => {
          path.setAttribute('fill', colors.provinceDefault);
          setHoveredProvince("");
        });
      });
    }
  }, []);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-4xl w-full flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
          Notre réseau national de partenaires
        </h2>
        <p className="text-gray-600 max-w-2xl text-center mb-8">
          Wanzo est géré par un réseau de partenaires locaux qui accompagnent les entrepreneurs dans leur quotidien, 
          en fournissant un soutien de proximité et une expertise adaptée à chaque région.
        </p>
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-500 mr-3 ring-4 ring-green-100"></div>
            <span className="text-base text-gray-700 font-medium">Wanzo opérationnel</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-orange-500 mr-3 ring-4 ring-orange-100"></div>
            <span className="text-base text-gray-700 font-medium">Bientôt disponible</span>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="relative w-[340px] h-[400px] sm:w-[600px] sm:h-[660px] overflow-visible rounded-lg">
            {/* Carte de la RDC avec ref pour accéder au DOM */}
            <MapRDC ref={mapRef} className="absolute top-0 left-0 w-full h-full" />
            
            {/* Points des villes */}
            <svg
              viewBox="0 0 1200 1200"
              className="absolute top-0 left-0 w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {cities.map((city) => (
                <g key={city.name}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={14}
                    fill={city.active ? colors.activeCity : colors.inactiveCity}
                    stroke="#fff"
                    strokeWidth={3}
                    className="cursor-pointer hover:stroke-gray-200 transition-all duration-300"
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onFocus={() => setHoveredCity(city)}
                    onBlur={() => setHoveredCity(null)}
                    tabIndex={0}
                  />
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={22}
                    fill="none"
                    stroke={city.active ? colors.activeCity : colors.inactiveCity}
                    strokeWidth={2}
                    strokeOpacity={0.4}
                    className="pointer-events-none"
                  />
                  <text
                    x={city.x + 28}
                    y={city.y + 10}
                    fontSize={32}
                    fill={colors.textColor}
                    fontWeight="bold"
                    style={{ 
                      fontFamily: 'Arial, sans-serif', 
                      pointerEvents: 'none',
                      paintOrder: 'stroke',
                      stroke: '#ffffff',
                      strokeWidth: 3,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round'
                    }}
                  >
                    {city.name}
                  </text>
                </g>
              ))}
              
              {/* Tooltip intégré dans le SVG pour éviter la vibration */}
              {hoveredCity && (
                <foreignObject
                  x={hoveredCity.x - 140}
                  y={hoveredCity.y - 180}
                  width="280"
                  height="180"
                  className="overflow-visible pointer-events-none"
                >
                  <div className="px-6 py-5 rounded-lg shadow-lg bg-white border-2 border-gray-200 text-gray-900 animate-fade-in relative">
                    <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-200"></div>
                    <div className="font-bold text-2xl mb-3">{hoveredCity.name}</div>
                    {hoveredCity.active ? (
                      <div className="text-green-600 font-semibold text-xl flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Wanzo est opérationnel
                      </div>
                    ) : (
                      <div className="text-orange-600 font-semibold text-xl flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Wanzo arrive bientôt
                      </div>
                    )}
                  </div>
                </foreignObject>
              )}
            </svg>
            
            {/* Affichage du nom de la province survolée */}
            {hoveredProvince && (
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 px-6 py-4 rounded-md shadow-md text-xl font-medium text-gray-700 border-2 border-gray-200 transition-opacity duration-300 ease-in-out flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Province: <span className="font-bold ml-1">{hoveredProvince}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
