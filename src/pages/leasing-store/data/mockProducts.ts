export const mockProducts = [
  // ============ ÉQUIPEMENTS INFORMATIQUES ============
  {
    id: "it-001",
    name: "Routeur TP-Link Jetstream Professionnel",
    description: "Routeur gigabit pour PME avec gestion avancée du trafic",
    image: "https://res.cloudinary.com/daxvxdecv/image/upload/v1743428386/kiota_suit/Leasing/Equipements%20informatiques/reseaux/Routeur%20TP-Link%20Jetstream%20Professionnel/qxciuzmbh8g0ljo3xsof.png",
    gallery: [
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743428387/kiota_suit/Leasing/Equipements%20informatiques/reseaux/Routeur%20TP-Link%20Jetstream%20Professionnel/yw6qrau9wvpec1f5almo.png",
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743428387/kiota_suit/Leasing/Equipements%20informatiques/reseaux/Routeur%20TP-Link%20Jetstream%20Professionnel/ruiebtedghu4nee1mhl5.png",
      "https://res.cloudinary.com/daxvxdecv/image/upload/v1743428386/kiota_suit/Leasing/Equipements%20informatiques/reseaux/Routeur%20TP-Link%20Jetstream%20Professionnel/walhqlaimuydi8dsc0pk.png"
    ],
    price: 350,
    monthlyPayment: 12.99,
    category: "informatique",
    subcategory: "reseaux",
    condition: "new",
    brand: "TP-Link",
    specifications: {
      ports: "8x Gigabit",
      wifi: "AC1200",
      securite: "Pare-feu intégré",
    },
    availableFinancing: ["operational_lease"],
    availableDurations: ["12", "24"],
    stock: 8,
  },
  {
    id: "it-002",
    name: "Imprimante HP LaserJet Pro",
    description: "Imprimante laser monochrome avec impression rapide",
    image: "https://example.com/imprimante-hp.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 200,
    monthlyPayment: 9.99,
    category: "informatique",
    subcategory: "impression",
    condition: "new",
    brand: "HP",
    specifications: {
      vitesse: "30 ppm",
      connectivite: "USB, Wi-Fi",
      resolution: "1200 dpi",
    },
    availableFinancing: ["leasing"],
    availableDurations: ["12", "24", "36"],
    stock: 15,
  },
  {
    id: "it-003",
    name: "iPad Pro 12.9”",
    description: "Tablette Apple avec écran Liquid Retina et puce M1",
    image: "https://example.com/ipad-pro.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 1200,
    monthlyPayment: 49.99,
    category: "informatique",
    subcategory: "tablettes",
    condition: "new",
    brand: "Apple",
    specifications: {
      ecran: "12.9” Liquid Retina",
      stockage: "256 Go",
      connectivite: "Wi-Fi, 5G",
    },
    availableFinancing: ["leasing", "credit"],
    availableDurations: ["12", "24", "36"],
    stock: 5,
  },
  {
    id: "it-004",
    name: "Imprimante 3D Creality Ender 3 V2",
    description: "Imprimante 3D économique avec haute précision d’impression",
    image: "https://example.com/creality-ender3.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 250,
    monthlyPayment: 10.99,
    category: "informatique",
    subcategory: "impression_3d",
    condition: "new",
    brand: "Creality",
    specifications: {
      volume: "220 x 220 x 250 mm",
      precision: "0.1 mm",
      materiaux: "PLA, ABS",
    },
    availableFinancing: ["leasing"],
    availableDurations: ["12", "24"],
    stock: 12,
  },
  {
    id: "it-005",
    name: "Drone DJI Phantom 4 Pro",
    description: "Drone professionnel avec caméra 4K et détection d’obstacles",
    image: "https://example.com/dji-phantom4.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 1800,
    monthlyPayment: 75.99,
    category: "informatique",
    subcategory: "drones",
    condition: "new",
    brand: "DJI",
    specifications: {
      camera: "4K UHD",
      autonomie: "30 min",
      portée: "7 km",
    },
    availableFinancing: ["credit", "leasing"],
    availableDurations: ["12", "24", "36"],
    stock: 3,
  },
  {
    id: "it-006",
    name: "Caméra Sony Alpha 7 IV",
    description:
      "Appareil photo hybride professionnel avec capteur plein format",
    image: "https://example.com/sony-alpha7.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 2500,
    monthlyPayment: 99.99,
    category: "informatique",
    subcategory: "audiovisuel",
    condition: "new",
    brand: "Sony",
    specifications: {
      resolution: "33 MP",
      video: "4K 60fps",
      stabilisation: "5 axes",
    },
    availableFinancing: ["credit", "leasing"],
    availableDurations: ["12", "24", "36"],
    stock: 4,
  },

  {
    id: "bu-002",
    name: "Rétroprojecteur Epson ProX",
    description: "Rétroprojecteur haute définition avec connectivité sans fil.",
    image: "https://example.com/retroprojecteur-epson.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 850,
    monthlyPayment: 35.99,
    category: "bureautique",
    subcategory: "retroprojecteurs",
    condition: "new",
    brand: "Epson",
    specifications: {
      resolution: "1080p",
      luminosite: "4000 lumens",
      connectivite: "HDMI, Wi-Fi",
    },
    availableFinancing: ["leasing", "credit"],
    availableDurations: ["12", "24"],
    stock: 5,
  },
//BUREAUTIQUE

  {
    id: "bu-001",
    name: "Bureau Exécutif en Bois Massif",
    description:
      "Bureau spacieux avec rangement intégré et finition en bois massif.",
    image: "https://example.com/bureau-bois.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 1200,
    monthlyPayment: 49.99,
    category: "bureautique",
    subcategory: "mobilier",
    condition: "new",
    brand: "OfficeLux",
    specifications: {
      dimensions: "160x80x75 cm",
      materiau: "Bois massif",
      couleur: "Noyer",
    },
    availableFinancing: ["leasing", "credit"],
    availableDurations: ["12", "24", "36"],
    stock: 10,
  },

  //TRANSPORT

  {
    id: 'vh-001',
    name: 'Toyota Hiace',
    description: 'Minibus polyvalent pour transport de passagers et de marchandises',
    image: 'https://example.com/toyota-hiace.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 35000,
    monthlyPayment: 799.99,
    category: 'vehicules',
    subcategory: 'transport_en_commun',
    condition: 'new',
    brand: 'Toyota',
    specifications: {
      moteur: '2.8L Diesel',
      capacite: '14 places',
      transmission: 'Manuelle 5 rapports'
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 5
  },
  {
    id: 'vh-002',
    name: 'Toyota Land Cruiser',
    description: 'Véhicule tout-terrain robuste adapté aux routes difficiles',
    image: 'https://example.com/toyota-landcruiser.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 75000,
    monthlyPayment: 1599.99,
    category: 'vehicules',
    subcategory: 'vehicules_speciaux',
    condition: 'new',
    brand: 'Toyota',
    specifications: {
      moteur: '4.5L Diesel V8',
      transmission: 'Automatique 6 rapports',
      capacite: '5 places'
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 3
  },
  {
    id: 'vh-003',
    name: 'Toyota Noah',
    description: 'Monospace familial avec grand confort et espace intérieur',
    image: 'https://example.com/toyota-noah.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 30000,
    monthlyPayment: 699.99,
    category: 'vehicules',
    subcategory: 'vehicules_utilitaires',
    condition: 'new',
    brand: 'Toyota',
    specifications: {
      moteur: '2.0L Essence',
      transmission: 'CVT',
      capacite: '7 places'
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 4
  },
  {
    id: 'vh-004',
    name: 'Toyota Fourgonnette Proace',
    description: 'Fourgonnette spacieuse pour le transport de marchandises',
    image: 'https://example.com/toyota-proace.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 28000,
    monthlyPayment: 649.99,
    category: 'vehicules',
    subcategory: 'vehicules_utilitaires',
    condition: 'new',
    brand: 'Toyota',
    specifications: {
      moteur: '2.0L Diesel',
      transmission: 'Manuelle 6 rapports',
      capacite: '3 places + grande soute'
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 6
  },
  {
    id: 'vh-005',
    name: 'Toyota Camionnette Hilux',
    description: 'Pick-up robuste pour les usages professionnels et tout-terrain',
    image: 'https://example.com/toyota-hilux.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 40000,
    monthlyPayment: 899.99,
    category: 'vehicules',
    subcategory: 'vehicules_utilitaires',
    condition: 'new',
    brand: 'Toyota',
    specifications: {
      moteur: '2.8L Diesel',
      transmission: 'Automatique 6 rapports',
      capacite: 'Double cabine'
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 5
  },
  {
    id: 'vh-006',
    name: 'Toyota Coaster',
    description: 'Bus de transport collectif idéal pour les longues distances',
    image: 'https://example.com/toyota-coaster.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 65000,
    monthlyPayment: 1399.99,
    category: 'vehicules',
    subcategory: 'transport_en_commun',
    condition: 'new',
    brand: 'Toyota',
    specifications: {
      moteur: '4.0L Diesel',
      transmission: 'Automatique 6 rapports',
      capacite: '30 places'
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 3
  },
  {
    id: 'vh-007',
    name: 'Moto Tricycle',
    description: 'Moto tricycle idéale pour le transport de marchandises en ville',
    image: 'https://example.com/moto-tricycle.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 6000,
    monthlyPayment: 199.99,
    category: 'vehicules',
    subcategory: 'motos',
    condition: 'new',
    brand: 'Giant Motors',
    specifications: {
      moteur: '150cc',
      transmission: 'Automatique',
      capacite: '2 places',
      usage: 'Transport de marchandises et passagers'
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 8
  },

  // ============ MACHINES OUTILS ============
  // Ajoutez ici d'autres produits de la catégorie "Machines Outils"

  {
    id: 'mi-001',
    name: 'Tour à métaux CNC',
    description: 'Machine à commande numérique pour usinage de pièces métalliques',
    image: 'https://example.com/tour-cnc.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 35000,
    monthlyPayment: 799.99,
    category: 'machines_industrielles',
    subcategory: 'machines_outils',
    condition: 'new',
    brand: 'XYZ Machinery',
    specifications: {
      moteur: '5.5 kW',
      capacité: 'Usinage de pièces jusqu\'à 500 mm de diamètre',
      vitesse_max: '2000 RPM',
      contrôle: 'CNC',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 4
  },

  // Machines Agricoles
  {
    id: 'mi-002',
    name: 'Tracteur Massey Ferguson 4707',
    description: 'Tracteur tout-terrain puissant pour les travaux agricoles',
    image: 'https://example.com/massey-ferguson-4707.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 42000,
    monthlyPayment: 899.99,
    category: 'machines_industrielles',
    subcategory: 'machines_agricoles',
    condition: 'new',
    brand: 'Massey Ferguson',
    specifications: {
      moteur: '4.4L Diesel',
      puissance: '95 HP',
      capacité: 'Tête de fauche et remorque',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 3
  },

  // Équipement de Chantier
  {
    id: 'mi-003',
    name: 'Pelleteuse Caterpillar 320',
    description: 'Pelleteuse hydraulique pour travaux de terrassement et de construction',
    image: 'https://example.com/pelleteuse-cat-320.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 80000,
    monthlyPayment: 1799.99,
    category: 'machines_industrielles',
    subcategory: 'equipement_chantier',
    condition: 'new',
    brand: 'Caterpillar',
    specifications: {
      moteur: '6.6L Diesel',
      puissance: '150 HP',
      capacité_benne: '1.5 m³',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 2
  },

  // Machines de Production
  {
    id: 'mi-004',
    name: 'Presses hydrauliques de production',
    description: 'Presses à haute capacité pour la fabrication de pièces métalliques',
    image: 'https://example.com/presses-hydrauliques.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 100000,
    monthlyPayment: 2499.99,
    category: 'machines_industrielles',
    subcategory: 'machines_production',
    condition: 'new',
    brand: 'Industrial Presses Inc.',
    specifications: {
      capacité: '2000 tonnes',
      pression_max: '2000 bar',
      contrôle: 'Automatique',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 1
  },

  // Machines Textiles
  {
    id: 'mi-005',
    name: 'Machine à tisser automatique',
    description: 'Machine de production textile pour tissage rapide et précis',
    image: 'https://example.com/machine-tissage.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 25000,
    monthlyPayment: 599.99,
    category: 'machines_industrielles',
    subcategory: 'machines_textile',
    condition: 'new',
    brand: 'TextileTech',
    specifications: {
      vitesse_max: '1000 mètres par minute',
      largeur_tissu: '2 m',
      contrôle: 'Automatique',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 5
  },

  // Machines de Métallurgie
  {
    id: 'mi-006',
    name: 'Fours industriels pour fusion de métaux',
    description: 'Fours à haute température pour la fusion des métaux précieux et industriels',
    image: 'https://example.com/fours-industriels.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 120000,
    monthlyPayment: 2999.99,
    category: 'machines_industrielles',
    subcategory: 'machines_metallurgie',
    condition: 'new',
    brand: 'MetalFusion Corp.',
    specifications: {
      capacité: '10 tonnes',
      température_max: '2000°C',
      source_énergie: 'Electrique',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 2
  },

  // Machines Alimentaires
  {
    id: 'mi-007',
    name: 'Machine de transformation alimentaire',
    description: 'Équipement pour transformer les produits alimentaires en grandes quantités',
    image: 'https://example.com/machine-transformation-alimentaire.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 55000,
    monthlyPayment: 1299.99,
    category: 'machines_industrielles',
    subcategory: 'machines_alimentaires',
    condition: 'new',
    brand: 'FoodTech',
    specifications: {
      capacité: '1000 kg/h',
      énergie: 'Hydraulique',
      application: 'Transformation des fruits et légumes',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 4
  },
  // ============ OUTILLAGE ============    
  // Ajoutez ici d'autres produits de la catégorie "OUTILLAGE"

  {
    id: 'ep-001',
    name: 'Perceuse à percussion Bosch',
    description: 'Perceuse à percussion professionnelle, idéale pour les travaux de maçonnerie et de construction',
    image: 'https://example.com/perceuse-bosch.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 120,
    monthlyPayment: 29.99,
    category: 'equipements_professionnels',
    subcategory: 'outillage',
    condition: 'new',
    brand: 'Bosch',
    specifications: {
      puissance: '850W',
      vitesse_max: '2800 RPM',
      accessoires: 'Mandrin de 13 mm',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 15
  },

  // Équipements Spécifiques
  {
    id: 'ep-002',
    name: 'Générateur Honda EU2200i',
    description: 'Générateur portable professionnel, idéal pour les chantiers ou les événements extérieurs',
    image: 'https://example.com/generator-honda.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 1000,
    monthlyPayment: 249.99,
    category: 'equipements_professionnels',
    subcategory: 'equipements_metiers',
    condition: 'new',
    brand: 'Honda',
    specifications: {
      puissance: '2200W',
      carburant: 'Essence',
      poids: '21 kg',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 8
  },

  // Matériel de Restauration
  {
    id: 'ep-003',
    name: 'Four Combiné Rational',
    description: 'Four combiné professionnel pour restaurants, permettant cuisson vapeur et convection',
    image: 'https://example.com/four-rational.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 12000,
    monthlyPayment: 2999.99,
    category: 'equipements_professionnels',
    subcategory: 'materiel_restauration',
    condition: 'new',
    brand: 'Rational',
    specifications: {
      capacité: '6 niveaux',
      fonctions: 'Convection, vapeur, combi-steam',
      puissance: '10 kW',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 3
  },

  // Équipements de Coiffure
  {
    id: 'ep-004',
    name: 'Salon de Coiffure Dyson Supersonic',
    description: 'Sèche-cheveux professionnel haute performance pour salons de coiffure',
    image: 'https://example.com/dyson-supersonic.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 400,
    monthlyPayment: 99.99,
    category: 'equipements_professionnels',
    subcategory: 'equipements_coiffure',
    condition: 'new',
    brand: 'Dyson',
    specifications: {
      puissance: '1600W',
      technologies: 'Technologie ionique, contrôle de la chaleur',
      accessoires: 'Buses et embouts pour différents styles',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 10
  },

  // Équipements Médicaux
  {
    id: 'ep-005',
    name: 'Appareil de Diagnostic ECG Philips',
    description: 'Appareil de diagnostic médical ECG portable pour un usage professionnel dans les hôpitaux',
    image: 'https://example.com/ecg-philips.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 5000,
    monthlyPayment: 1199.99,
    category: 'equipements_professionnels',
    subcategory: 'equipements_sante',
    condition: 'new',
    brand: 'Philips',
    specifications: {
      écran: 'LCD 7 pouces',
      types_diagnostiques: 'ECG, analyse des ondes',
      connectivité: 'USB, Bluetooth',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 5
  },

  // Équipements de Stockage
  {
    id: 'ep-006',
    name: 'Chariot de Stockage en Acier Inoxydable',
    description: 'Chariot de stockage robuste pour les entrepôts, idéal pour transporter des produits en toute sécurité',
    image: 'https://example.com/chariot-acier.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 250,
    monthlyPayment: 59.99,
    category: 'equipements_professionnels',
    subcategory: 'equipements_stockage',
    condition: 'new',
    brand: 'ProStorage',
    specifications: {
      dimensions: '120 x 60 x 80 cm',
      matériaux: 'Acier inoxydable',
      capacité: '200 kg',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 12
  },
  // ============ AGRICULTURE ============
  // Ajoutez ici d'autres produits de la catégorie "AGRICULTURE"
  {
    id: 'ag-001',
    name: 'Tracteur John Deere 5050E',
    description: 'Tracteur agricole polyvalent, idéal pour le labour, la culture, et l’entretien des champs',
    image: 'https://example.com/tracteur-john-deere.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 25000,
    monthlyPayment: 599.99,
    category: 'agriculture',
    subcategory: 'machines_agricoles',
    condition: 'new',
    brand: 'John Deere',
    specifications: {
      puissance: '50 ch',
      moteur: 'Diesel',
      transmission: 'Manuelle 4 vitesses',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 4
  },
  {
    id: 'ag-002',
    name: 'Moissonneuse-batteuse Case IH',
    description: 'Moissonneuse-batteuse de haute capacité pour récoltes de céréales',
    image: 'https://example.com/moissonneuse-case-ih.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 120000,
    monthlyPayment: 2999.99,
    category: 'agriculture',
    subcategory: 'machines_agricoles',
    condition: 'new',
    brand: 'Case IH',
    specifications: {
      capacité_de_récolte: '50 tonnes/h',
      moteur: '250 ch',
      type: 'Autotractée',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 2
  },

  // Équipements d'Élevage
  {
    id: 'ag-003',
    name: 'Trayeuse Automatique DeLaval',
    description: 'Trayeuse automatique pour un rendement élevé et une gestion optimale de l’élevage laitier',
    image: 'https://example.com/trayeuse-delaval.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 5000,
    monthlyPayment: 1499.99,
    category: 'agriculture',
    subcategory: 'equipements_elevage',
    condition: 'new',
    brand: 'DeLaval',
    specifications: {
      type: 'Trayeuse à vache',
      capacité: '12 vaches',
      caractéristiques: 'Contrôle de la température, système d’aspiration doux',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 5
  },
  {
    id: 'ag-004',
    name: 'Pailleuse Kuhn',
    description: 'Pailleuse professionnelle pour la gestion des litières d’animaux',
    image: 'https://example.com/pailleuse-kuhn.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 8500,
    monthlyPayment: 1999.99,
    category: 'agriculture',
    subcategory: 'equipements_elevage',
    condition: 'new',
    brand: 'Kuhn',
    specifications: {
      capacité: '200 m³',
      type: 'Pailleuse rotative',
      usage: 'Distribution de paille pour élevage',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 3
  },

  // Stockage Agricole
  {
    id: 'ag-005',
    name: 'Silo de Stockage Céréales',
    description: 'Silo en métal pour le stockage sécurisé des céréales',
    image: 'https://example.com/silo-cereales.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 15000,
    monthlyPayment: 359.99,
    category: 'agriculture',
    subcategory: 'stockage_agricole',
    condition: 'new',
    brand: 'SiloTech',
    specifications: {
      capacité: '50 tonnes',
      matériau: 'Acier galvanisé',
      dimensions: '5m x 3m x 10m',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 6
  },
  {
    id: 'ag-006',
    name: 'Entrepôt de Stockage Agricole',
    description: 'Entrepôt pour le stockage de grandes quantités de produits agricoles, conçu pour offrir une ventilation optimale',
    image: 'https://example.com/entrepot-agricole.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 30000,
    monthlyPayment: 749.99,
    category: 'agriculture',
    subcategory: 'stockage_agricole',
    condition: 'new',
    brand: 'AgriStorage',
    specifications: {
      taille: '100 m²',
      matériau: 'Acier inoxydable, PVC',
      ventilation: 'Système de ventilation forcée',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['24', '36', '48'],
    stock: 4
  },

  // ============ EAU & ENERGIE ============
  // Ajoutez ici d'autres produits de la catégorie "EAU & ENERGIE"

  {
    id: 'en-001',
    name: 'Groupe Électrogène Diesel Cummins 50kVA',
    description: 'Générateur Diesel fiable pour un usage commercial et industriel avec une puissance de 50 kVA.',
    image: 'https://example.com/groupe-electrogene-cummins.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 12000,
    monthlyPayment: 299.99,
    category: 'energie',
    subcategory: 'groupes_electrogenes',
    condition: 'new',
    brand: 'Cummins',
    specifications: {
      puissance: '50 kVA',
      moteur: 'Diesel',
      type: 'Stationnaire',
      autonomie: '12 heures',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24', '36'],
    stock: 3
  },
  {
    id: 'en-002',
    name: 'Groupe Électrogène Honda 20kVA',
    description: 'Générateur compact et robuste, idéal pour les petites entreprises et les sites à faible consommation.',
    image: 'https://example.com/groupe-electrogene-honda.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 8000,
    monthlyPayment: 199.99,
    category: 'energie',
    subcategory: 'groupes_electrogenes',
    condition: 'new',
    brand: 'Honda',
    specifications: {
      puissance: '20 kVA',
      moteur: 'Essence',
      type: 'Portable',
      autonomie: '8 heures',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 5
  },

  // Pompes à Eau
  {
    id: 'en-003',
    name: 'Pompe à Eau Submersible Grundfos',
    description: 'Pompe submersible pour les applications domestiques et agricoles, conçue pour une durabilité maximale.',
    image: 'https://example.com/pompe-eau-grundfos.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 1500,
    monthlyPayment: 39.99,
    category: 'energie',
    subcategory: 'pompes_eau',
    condition: 'new',
    brand: 'Grundfos',
    specifications: {
      débit: '5000 L/h',
      puissance: '1.5 HP',
      type: 'Submersible',
      usage: 'Agricole et Domestique',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 8
  },
  {
    id: 'en-004',
    name: 'Pompe à Eau Pour Irrigation',
    description: 'Pompe à eau pour systèmes d’irrigation agricole, haute performance et faible consommation d’énergie.',
    image: 'https://example.com/pompe-irrigation.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 2500,
    monthlyPayment: 59.99,
    category: 'energie',
    subcategory: 'pompes_eau',
    condition: 'new',
    brand: 'KSB',
    specifications: {
      débit: '8000 L/h',
      puissance: '3 HP',
      type: 'Centrifuge',
      usage: 'Agriculture',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 4
  },

  // Traitement d'Eau
  {
    id: 'en-005',
    name: 'Filtre à Eau Reverse Osmosis',
    description: 'Système de filtration à osmose inverse pour purifier l’eau potable domestique et industrielle.',
    image: 'https://example.com/filtre-eau-osmose.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 3500,
    monthlyPayment: 89.99,
    category: 'energie',
    subcategory: 'traitement_eau',
    condition: 'new',
    brand: 'Aquatec',
    specifications: {
      capacité: '1000 L/jour',
      technologie: 'Osmose Inverse',
      usage: 'Domestique et Industriel',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 6
  },
  {
    id: 'en-006',
    name: 'Stérilisateur UV pour Eau',
    description: 'Système de stérilisation UV pour éliminer les bactéries et virus dans l’eau potable.',
    image: 'https://example.com/sterilisateur-uv.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 2000,
    monthlyPayment: 49.99,
    category: 'energie',
    subcategory: 'traitement_eau',
    condition: 'new',
    brand: 'Sterilight',
    specifications: {
      capacité: '500 L/h',
      technologie: 'UV',
      usage: 'Domestique et Commercial',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 4
  },

  // Réservoirs et Stockage
  {
    id: 'en-007',
    name: 'Réservoir à Eau Polyéthylène 5000L',
    description: 'Réservoir en polyéthylène résistant pour stockage d’eau potable ou industrielle.',
    image: 'https://example.com/reservoir-eau-polyethylene.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 1200,
    monthlyPayment: 29.99,
    category: 'energie',
    subcategory: 'reservoirs',
    condition: 'new',
    brand: 'Plastico',
    specifications: {
      capacité: '5000 L',
      matériau: 'Polyéthylène',
      usage: 'Stockage d’eau potable',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 5
  },
  {
    id: 'en-008',
    name: 'Réservoir en Acier Inoxydable 10,000L',
    description: 'Réservoir en acier inoxydable de grande capacité pour le stockage d’eau ou de produits chimiques.',
    image: 'https://example.com/reservoir-acier-inoxydable.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 3500,
    monthlyPayment: 89.99,
    category: 'energie',
    subcategory: 'reservoirs',
    condition: 'new',
    brand: 'StainlessTank',
    specifications: {
      capacité: '10,000 L',
      matériau: 'Acier inoxydable',
      usage: 'Stockage d’eau et produits chimiques',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 3
  },


  // ============ EVENEMENTIEL ============
  // Ajoutez ici d'autres produits de la catégorie "EVENEMENTIEL"

  {
    id: 'ev-001',
    name: 'Tente de Réception 10x20m',
    description: 'Tente de réception spacieuse pour grands événements, idéale pour mariages, salons et événements en extérieur.',
    image: 'https://example.com/tente-reception-10x20m.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 3500,
    monthlyPayment: 89.99,
    category: 'evenementiel',
    subcategory: 'tentes',
    condition: 'new',
    brand: 'EventTents',
    specifications: {
      dimensions: '10x20m',
      matériau: 'Polyéthylène',
      type: 'Tente de Réception',
      capacité: '200 personnes',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 4
  },
  {
    id: 'ev-002',
    name: 'Tente Pliante 3x3m',
    description: 'Tente pliante légère et portable, idéale pour les événements plus petits, les stands et les expositions.',
    image: 'https://example.com/tente-pliante-3x3m.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 250,
    monthlyPayment: 9.99,
    category: 'evenementiel',
    subcategory: 'tentes',
    condition: 'new',
    brand: 'QuickShade',
    specifications: {
      dimensions: '3x3m',
      matériau: 'Polyester',
      type: 'Tente Pliante',
      capacité: '10-15 personnes',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12'],
    stock: 20
  },

  // Sonorisation
  {
    id: 'ev-003',
    name: 'Système de Sonorisation JBL EON615',
    description: 'Système de sonorisation portable avec des haut-parleurs puissants, idéal pour les événements en intérieur et extérieur.',
    image: 'https://example.com/systeme-sonorisation-jbl-eon615.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 1500,
    monthlyPayment: 39.99,
    category: 'evenementiel',
    subcategory: 'sonorisation',
    condition: 'new',
    brand: 'JBL',
    specifications: {
      puissance: '1000W',
      type: 'Haut-parleur actif',
      connectivité: 'Bluetooth, XLR, RCA',
      usage: 'Événements Intérieurs et Extérieurs',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 5
  },
  {
    id: 'ev-004',
    name: 'Pack Sonorisation Bose L1 Compact',
    description: 'Pack de sonorisation portable avec système de ligne de source et subwoofer intégré pour des performances audio de qualité.',
    image: 'https://example.com/pack-sonorisation-bose-l1.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 2200,
    monthlyPayment: 54.99,
    category: 'evenementiel',
    subcategory: 'sonorisation',
    condition: 'new',
    brand: 'Bose',
    specifications: {
      puissance: '200W',
      type: 'Système de Ligne de Source',
      connectivité: 'Bluetooth, XLR',
      usage: 'Concerts, Conférences',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 3
  },

  // Matériel de Livraison
  {
    id: 'ev-005',
    name: 'Chariot Électrique de Livraison',
    description: 'Chariot de livraison électrique avec une capacité de charge élevée pour le transport rapide des équipements lors des événements.',
    image: 'https://example.com/chariot-electrique-livraison.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 4500,
    monthlyPayment: 112.99,
    category: 'evenementiel',
    subcategory: 'materiel_livraison',
    condition: 'new',
    brand: 'TransLogistics',
    specifications: {
      capacité: '500 kg',
      type: 'Chariot Électrique',
      autonomie: '8 heures',
      vitesse_max: '20 km/h',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 2
  },
  {
    id: 'ev-006',
    name: 'Chariot à Main pour Livraison',
    description: 'Chariot manuel robuste, facile à transporter pour les livraisons légères dans les événements.',
    image: 'https://example.com/chariot-main-livraison.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 250,
    monthlyPayment: 9.99,
    category: 'evenementiel',
    subcategory: 'materiel_livraison',
    condition: 'new',
    brand: 'LoadMate',
    specifications: {
      capacité: '100 kg',
      type: 'Chariot Manuel',
      roues: 'Pneumatiques',
      usage: 'Livraison de petits objets',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12'],
    stock: 10
  },
  {
    id: 'ev-008',
    name: 'Podium Métallique Démontable 8x6m',
    description: 'Podium métallique démontable, léger et modulable, conçu pour les événements extérieurs. Facile à transporter et à assembler.',
    image: 'https://example.com/podium-metallique-demontable.jpg',
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    price: 7500,
    monthlyPayment: 179.99,
    category: 'evenementiel',
    subcategory: 'tentes',
    condition: 'new',
    brand: 'EventPodium',
    specifications: {
      dimensions: '8x6m',
      matériau: 'Métal et Aluminium',
      capacité: '500 personnes',
      poids: '350 kg',
      usage: 'Concerts, Événements Extérieurs',
    },
    availableFinancing: ['credit_bail', 'leasing'],
    availableDurations: ['12', '24'],
    stock: 2
  }

];
