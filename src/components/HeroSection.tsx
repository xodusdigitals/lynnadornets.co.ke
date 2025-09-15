import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-jewelry.jpg';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Lynn Adornets Luxury Jewelry Collection" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-primary mr-3 animate-glow" />
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-foreground tracking-wide">
              Lynn Adornets
            </h1>
            <Sparkles className="h-8 w-8 text-primary ml-3 animate-glow" />
          </div>
          
          <p className="text-xl sm:text-2xl font-light text-muted-foreground mb-8 tracking-wide">
            Elegance in Every Ray
          </p>
          
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover our exquisite collection of handcrafted jewelry. Each piece tells a story of 
            timeless beauty, crafted with passion and precision for the modern woman who appreciates 
            luxury and elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-light tracking-wide transition-elegant"
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-light tracking-wide transition-elegant"
              onClick={() => document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Custom Design
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-8 bg-primary/50"></div>
      </div>
    </section>
  );
};

export default HeroSection;