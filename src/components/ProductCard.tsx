import React from 'react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="group cursor-pointer jewelry-hover product-card border-0 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover transition-elegant group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-elegant flex items-center justify-center">
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => onViewDetails(product)}
              className="bg-background/90 hover:bg-background"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button 
              size="sm"
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.originalPrice && product.originalPrice > product.price && (
            <Badge className="bg-destructive text-destructive-foreground">
              Save KSH {(product.originalPrice - product.price).toLocaleString()}
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="font-medium text-lg leading-tight">{product.name}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-primary">
              KSH {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                KSH {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {product.materials && product.materials.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.materials.map((material) => (
                <Badge key={material} variant="outline" className="text-xs">
                  {material}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};