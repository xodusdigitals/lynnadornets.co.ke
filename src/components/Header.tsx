import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { CartDrawer } from './CartDrawer';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight * 0.8); // Trigger at 80% of hero height
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Necklaces', href: '#necklaces' },
    { name: 'Earrings', href: '#earrings' },
    { name: 'Bracelets', href: '#bracelets' },
    { name: 'Rings', href: '#rings' },
    { name: 'Sunglasses', href: '#sunglasses' },
    { name: 'Bridal', href: '#bridal' },
    { name: 'Custom', href: '#custom' }
  ];

  const handleNavClick = (href: string) => {
    if (href === '#home') {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Update hash first, then scroll to collections
      window.location.hash = href;
      setTimeout(() => {
        document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <header className={`gradient-header backdrop-blur-sm border-b border-border/30 sticky top-0 z-50 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-95'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-40">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a 
                href="#home" 
                className="block"
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <img 
                  src="/lovable-uploads/78e9f7a5-2f4c-4052-82aa-a9406a21955d.png" 
                  alt="Lynn Adornets - Elegance in Every Ray" 
                  className="h-32 w-auto cursor-pointer"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-secondary-foreground hover:text-primary transition-elegant text-sm font-light tracking-wide"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-primary hover:text-secondary-foreground">
                <Search className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="hidden sm:flex text-primary hover:text-secondary-foreground">
                <Heart className="h-4 w-4" />
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-primary hover:text-secondary-foreground"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-primary hover:text-secondary-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/30 gradient-header">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-secondary-foreground hover:text-primary transition-elegant"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;