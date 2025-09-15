import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { getFeaturedProducts } from '@/data/products';
import { Product } from '@/types/product';
import { Sparkles } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <section id="featured" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-4xl font-serif font-light text-foreground">
                Featured Collection
              </h2>
              <Sparkles className="h-6 w-6 text-primary ml-2" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most beloved pieces, carefully selected for their exceptional 
              beauty and craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
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

export default FeaturedProducts;