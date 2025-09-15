import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import heroJewelry from '@/assets/hero-jewelry.jpg';
import heroBridal from '@/assets/hero-bridal.jpg';
import heroSunglasses from '@/assets/hero-sunglasses.jpg';

const slides = [
  {
    id: 1,
    image: heroJewelry,
    title: 'Lynn Adornets',
    subtitle: 'Elegance in Every Ray',
    description: 'Discover our exquisite collection of handcrafted jewelry. Each piece tells a story of timeless beauty, crafted with passion and precision for the modern woman.',
    primaryButton: { text: 'Explore Collection', action: () => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' }) },
    secondaryButton: { text: 'Custom Design', action: () => document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' }) }
  },
  {
    id: 2,
    image: heroBridal,
    title: 'Bridal Collection',
    subtitle: 'Your Perfect Day Deserves Perfect Jewelry',
    description: 'Make your special day unforgettable with our stunning bridal collection. From elegant tiaras to complete jewelry sets, each piece is designed to complement your beauty.',
    primaryButton: { text: 'View Bridal', action: () => document.getElementById('bridal')?.scrollIntoView({ behavior: 'smooth' }) },
    secondaryButton: { text: 'Custom Bridal', action: () => document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' }) }
  },
  {
    id: 3,
    image: heroSunglasses,
    title: 'Luxury Sunglasses',
    subtitle: 'Style Meets Protection',
    description: 'Complete your look with our premium sunglasses collection. Featuring designer frames and high-quality lenses for the ultimate in style and sun protection.',
    primaryButton: { text: 'Shop Sunglasses', action: () => document.getElementById('sunglasses')?.scrollIntoView({ behavior: 'smooth' }) },
    secondaryButton: { text: 'All Collections', action: () => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' }) }
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[currentSlide];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={current.image} 
          alt={`${current.title} - Lynn Adornets`} 
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-background/40"></div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-primary mr-3 animate-glow" />
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-foreground tracking-wide">
              {current.title}
            </h1>
            <Sparkles className="h-8 w-8 text-primary ml-3 animate-glow" />
          </div>
          
          <p className="text-xl sm:text-2xl font-light text-muted-foreground mb-8 tracking-wide">
            {current.subtitle}
          </p>
          
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            {current.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-light tracking-wide transition-elegant"
              onClick={current.primaryButton.action}
            >
              {current.primaryButton.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-light tracking-wide transition-elegant"
              onClick={current.secondaryButton.action}
            >
              {current.secondaryButton.text}
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary' : 'bg-background/50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-8 bg-primary/50"></div>
      </div>
    </section>
  );
};

export default HeroCarousel;