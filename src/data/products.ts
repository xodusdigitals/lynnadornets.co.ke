import { Product } from '@/types/product';
import necklace1 from '@/assets/necklace-1.jpg';
import earrings1 from '@/assets/earrings-1.jpg';
import bracelet1 from '@/assets/bracelet-1.jpg';
import ring1 from '@/assets/ring-1.jpg';
import sunglasses1 from '@/assets/sunglasses-1.jpg';
import sunglasses2 from '@/assets/sunglasses-2.jpg';
import sunglasses3 from '@/assets/sunglasses-3.jpg';
import bridal1 from '@/assets/bridal-1.jpg';
import bridal2 from '@/assets/bridal-2.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Golden Elegance Necklace',
    description: 'Exquisite handcrafted gold necklace with delicate pendant. Perfect for special occasions or everyday elegance.',
    price: 1800,
    originalPrice: 2000,
    category: 'necklaces',
    images: [necklace1],
    inStock: true,
    featured: true,
    materials: ['18K Gold', 'Diamond'],
    size: '18 inches'
  },
  {
    id: '2',
    name: 'Crystal Drop Earrings',
    description: 'Beautiful gold drop earrings adorned with premium crystals. Adds sparkle to any outfit.',
    price: 850,
    category: 'earrings',
    images: [earrings1],
    inStock: true,
    featured: true,
    materials: ['14K Gold', 'Austrian Crystal']
  },
  {
    id: '3',
    name: 'Charm Bracelet',
    description: 'Delicate gold bracelet with meaningful charms. A perfect gift for someone special.',
    price: 1200,
    category: 'bracelets',
    images: [bracelet1],
    inStock: true,
    materials: ['18K Gold'],
    size: 'Adjustable'
  },
  {
    id: '4',
    name: 'Diamond Solitaire Ring',
    description: 'Classic diamond engagement ring in gold setting. Timeless beauty for your special moment.',
    price: 2000,
    originalPrice: 2000,
    category: 'rings',
    images: [ring1],
    inStock: true,
    featured: true,
    materials: ['18K Gold', '0.5ct Diamond'],
    size: 'Size 6 (resizable)'
  },
  {
    id: '5',
    name: 'Golden Frame Sunglasses',
    description: 'Luxurious designer sunglasses with premium golden frames. Perfect for any occasion.',
    price: 800,
    originalPrice: 1000,
    category: 'sunglasses',
    images: [sunglasses1],
    inStock: true,
    featured: true,
    materials: ['Premium Metal Frame', 'UV Protection Lenses']
  },
  {
    id: '6',
    name: 'Rose Gold Aviators',
    description: 'Classic aviator style with rose gold frames and premium dark lenses.',
    price: 950,
    category: 'sunglasses',
    images: [sunglasses2],
    inStock: true,
    materials: ['Rose Gold Frame', 'Polarized Lenses']
  },
  {
    id: '7',
    name: 'Oversized Elegance',
    description: 'Sophisticated oversized sunglasses with tortoiseshell pattern for timeless style.',
    price: 750,
    category: 'sunglasses',
    images: [sunglasses3],
    inStock: true,
    materials: ['Acetate Frame', 'Anti-Glare Lenses']
  },
  {
    id: '8',
    name: 'Bridal Pearl Tiara',
    description: 'Exquisite bridal tiara with pearls and crystals. Perfect for your special day.',
    price: 1500,
    category: 'bridal',
    images: [bridal1],
    inStock: true,
    featured: true,
    materials: ['Sterling Silver', 'Freshwater Pearls', 'Crystals']
  },
  {
    id: '9',
    name: 'Wedding Jewelry Set',
    description: 'Complete bridal set with necklace and earrings featuring pearls and diamonds.',
    price: 1750,
    originalPrice: 2000,
    category: 'bridal',
    images: [bridal2],
    inStock: true,
    materials: ['White Gold', 'Pearls', 'Diamonds']
  },
  {
    id: '10',
    name: 'Custom Design Consultation',
    description: 'Work with our designers to create your perfect piece. From concept to creation.',
    price: 500,
    category: 'custom',
    images: [necklace1],
    inStock: true,
    materials: ['Varies based on design']
  }
];

export const getProductsByCategory = (category: Product['category']) => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};
