import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1 space-y-4">
            <div>
              <h3 className="text-2xl font-serif font-light text-primary mb-2">
                Lynn Adornets
              </h3>
              <p className="text-sm text-background/80 mb-4">
                Elegance in Every Ray
              </p>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Crafting timeless jewelry pieces that celebrate the beauty and elegance 
              of every woman. Each creation tells a unique story of passion and precision.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-background/70 hover:text-primary"
                onClick={() => window.open('https://www.facebook.com', '_blank')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-background/70 hover:text-primary"
                onClick={() => window.open('https://www.instagram.com/_lynn_adornets/', '_blank')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-background/70 hover:text-primary"
                onClick={() => window.open('https://www.tiktok.com/@lynn_adornets?_t=ZM-8zCtBuxW8k4&_r=1', '_blank')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-background/70 hover:text-primary"
                onClick={() => window.open('https://www.twitter.com', '_blank')}
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-background">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Sunglasses', 'Bridal', 'Custom Design'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`} 
                    className="text-background/70 hover:text-primary transition-elegant"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-medium text-background">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-elegant">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-elegant">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-elegant">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-elegant">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-elegant">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-background">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/70">+254 700 060 496</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/70">hello@lynnadornets.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-background/70">
                  Nairobi, Kenya<br />
                  Worldwide Shipping Available
                </span>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <Button 
              variant="outline" 
              size="sm"
              className="bg-green-600 hover:bg-green-700 border-green-600 text-white"
              onClick={() => window.open('https://wa.me/254700060496', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center text-sm text-background/60">
          <p>
            © {currentYear} Lynn Adornets. All rights reserved. | Elegance in Every Ray
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-elegant">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-elegant">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-elegant">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;