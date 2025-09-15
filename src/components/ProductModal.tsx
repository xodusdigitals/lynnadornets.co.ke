import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Minus, Plus, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover transition-elegant group-hover:scale-110"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.originalPrice && product.originalPrice > product.price && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-light mb-2">{product.name}</h1>
              <p className="text-muted-foreground capitalize text-sm tracking-wide">
                {product.category.replace(/s$/, '')} Collection
              </p>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-light text-primary">
                KSH {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-muted-foreground line-through">
                  KSH {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-foreground/80 leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="space-y-4">
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Materials</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material) => (
                      <Badge key={material} variant="outline">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {product.size && (
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <p className="text-sm text-muted-foreground">{product.size}</p>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                {!product.inStock && (
                  <p className="text-sm text-muted-foreground text-center">
                    This item is currently out of stock. Please check back later or contact us for availability.
                  </p>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
              <p>✨ Handcrafted with premium materials</p>
              <p>🚚 Free delivery within Nairobi</p>
              <p>💎 Lifetime craftsmanship warranty</p>
              <p>📞 WhatsApp support: +254 700 060 496</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};