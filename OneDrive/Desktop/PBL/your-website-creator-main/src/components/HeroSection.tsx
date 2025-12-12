import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroVegetables from '@/assets/hero-vegetables.jpg';
import heroSpices from '@/assets/hero-spices.jpg';

const slides = [
  {
    id: 1,
    title: 'Personalized Diet Planning Made Simple',
    description: 'Create custom meal plans that honor your culture while meeting your health goals',
    cta: 'Start Planning',
    image: heroVegetables,
  },
  {
    id: 2,
    title: 'Your Kitchen is Your Pharmacy',
    description: 'Discover validated home remedies backed by science and trusted by communities',
    cta: 'Browse Home Remedies',
    image: heroSpices,
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative h-[500px] md:h-[550px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative z-10 flex h-full items-center">
              <div className="max-w-xl animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-50 mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                  {slide.description}
                </p>
                <Button variant="hero" size="lg" className="group">
                  {slide.cta}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 text-gray-50 hover:bg-background/40 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 text-gray-50 hover:bg-background/40 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-background/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
