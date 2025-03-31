import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import type { Product } from '../types';

interface ProductGalleryProps {
  product: Product;
  enableZoom?: boolean;
}

export function ProductGallery({ product, enableZoom }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [zoomed, setZoomed] = useState(false);

  const handleZoomToggle = () => {
    if (enableZoom) {
      setZoomed(!zoomed);
    }
  };

  // Combine l'image principale et les images de la galerie
  const images = [product.image, ...(product.gallery || [])];

  return (
    <div className="space-y-4">
      {/* Carrousel principal */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="aspect-square rounded-lg overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Zoom>
              <img
                src={image}
                alt={product.name}
                className={`w-full h-full object-cover ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={handleZoomToggle}
              />
            </Zoom>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniatures */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-24"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-full rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
              <img
                src={image}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {enableZoom && (
        <p className="text-sm text-gray-500 mt-2">
          {zoomed ? 'Cliquez pour réduire' : 'Cliquez pour zoomer'}
        </p>
      )}
    </div>
  );
}