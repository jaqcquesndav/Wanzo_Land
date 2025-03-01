import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { useState, useEffect } from 'react';

const titles = [
  " Hey, prenez en main votre PME grâce au numérique 👋",
  " Trouvez le financement qui vous convient 💰",
  " Assurez votre croissance grâce l'IA 🚀"
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((current) => (current + 1) % titles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    navigate('/auth/select');
  };

  const handleWaitingListClick = () => {
    window.open('https://forms.gle/TRZTiTyW63YVjocu9', '_blank');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50/20">
      <Container className="relative z-10 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="min-h-[160px] mt-6">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={titleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6"
                >
                  {titles[titleIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              Découvrez notre suite d'applications intégrées avec Adha, notre assistant IA, 
              qui révolutionne la gestion et le financement des PME africaines.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleStartClick}
                className="w-full sm:w-auto rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-hover transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </button>
              <button
                onClick={handleWaitingListClick}
                className="w-full sm:w-auto rounded-full bg-warning px-8 py-4 text-lg font-semibold text-white ring-1 ring-warning/20 shadow-sm hover:bg-warning-hover transition-all duration-200 flex items-center justify-center"
              >
                Liste d'attente
                <ChevronRight className="ml-2 h-5 w-5 inline" />
              </button>
            </div>
          </motion.div>

          <div className="relative lg:block hidden">
            <img
              src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Gestion PME"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
          </div>
        </div>
      </Container>
    </div>
  );
}