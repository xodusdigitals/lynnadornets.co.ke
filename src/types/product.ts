export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'necklaces' | 'earrings' | 'bracelets' | 'rings' | 'sunglasses' | 'bridal' | 'custom';
  images: string[];
  inStock: boolean;
  featured?: boolean;
  materials?: string[];
  size?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  deliveryType: 'local' | 'international';
  paymentMethod: 'cash' | 'mpesa-delivery' | 'mpesa-now';
  notes?: string;
}