import React from 'react';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroCarousel />
          <FeaturedProducts />
          <CategorySection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
