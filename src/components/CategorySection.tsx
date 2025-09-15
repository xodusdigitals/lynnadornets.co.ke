import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { getProductsByCategory } from '@/data/products';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crown, Gem, Heart, Diamond, Wand2, Sun, Flower2 } from 'lucide-react';

const categories = [
  { 
    id: 'necklaces', 
    name: 'Necklaces', 
    description: 'Elegant pieces to grace your neckline',
    icon: Crown
  },
  { 
    id: 'earrings', 
    name: 'Earrings', 
    description: 'Sparkling accents for every occasion',
    icon: Gem
  },
  { 
    id: 'bracelets', 
    name: 'Bracelets', 
    description: 'Delicate chains and charming details',
    icon: Heart
  },
  { 
    id: 'rings', 
    name: 'Rings', 
    description: 'Symbols of love and commitment',
    icon: Diamond
  },
  { 
    id: 'sunglasses', 
    name: 'Sunglasses', 
    description: 'Stylish protection with luxury appeal',
    icon: Sun
  },
  { 
    id: 'bridal', 
    name: 'Bridal', 
    description: 'Perfect pieces for your special day',
    icon: Flower2
  },
  { 
    id: 'custom', 
    name: 'Custom Design', 
    description: 'Bring your unique vision to life',
    icon: Wand2
  }
];

const CategorySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('necklaces');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Listen for hash changes to update selected category
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      const validCategories = categories.map(cat => cat.id);
      if (validCategories.includes(hash)) {
        setSelectedCategory(hash);
      }
    };

    // Set initial category from hash
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const currentProducts = getProductsByCategory(selectedCategory as Product['category']);

  return (
    <>
      <section id="collections" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-light text-foreground mb-4">
              Our Collections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated categories, each designed to celebrate 
              different aspects of your unique style
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2 px-6 py-3"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Category Description */}
          <div className="text-center mb-8">
            <div className="max-w-md mx-auto">
              {(() => {
                const category = categories.find(cat => cat.id === selectedCategory);
                const IconComponent = category?.icon || Crown;
                return (
                  <div className="flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-2xl font-serif font-light">
                      {category?.name}
                    </h3>
                  </div>
                );
              })()}
              <p className="text-muted-foreground">
                {categories.find(cat => cat.id === selectedCategory)?.description}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    onViewDetails={setSelectedProduct}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Crown className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                We're crafting beautiful pieces for this collection. Stay tuned!
              </p>
              <Button variant="outline">
                Notify Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default CategorySection;