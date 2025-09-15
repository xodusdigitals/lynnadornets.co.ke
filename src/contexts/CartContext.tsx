import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, CustomerDetails } from '@/types/product';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  checkout: (customerDetails: CustomerDetails) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const checkout = async (customerDetails: CustomerDetails): Promise<boolean> => {
    const total = getTotalPrice();
    const itemsList = cartItems.map(item => 
      `${item.name} - Qty: ${item.quantity} - KSH ${item.price.toLocaleString()}`
    ).join('\n');

    const getPaymentInfo = () => {
      switch (customerDetails.paymentMethod) {
        case 'cash':
          return '💵 *Payment Method:* Cash on Delivery';
        case 'mpesa-delivery':
          return `💳 *Payment Method:* M-Pesa on Delivery
Pay Bill No: 247247
Account No: 0700060496
Account Name: Lynn Adornets`;
        case 'mpesa-now':
          return `💳 *Payment Method:* M-Pesa (Pay Now)
Pay Bill No: 247247
Account No: 0700060496
Account Name: Lynn Adornets
*Please complete payment before delivery*`;
        default:
          return '';
      }
    };

    const message = `
🛍️ *New order from ${customerDetails.name}*

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Email: ${customerDetails.email}

📍 *Delivery Address:*
${customerDetails.address}
${customerDetails.city}, ${customerDetails.country}
Delivery Type: ${customerDetails.deliveryType === 'local' ? 'Local (Kenya)' : 'International'}

${getPaymentInfo()}

🛒 *Order Items:*
${itemsList}

💰 *Total: KSH ${total.toLocaleString()}*

${customerDetails.notes ? `📝 *Notes:* ${customerDetails.notes}` : ''}

Please confirm this order. Thank you! ✨
    `.trim();

    try {
      const phone = '254700060496';
      const encodedText = encodeURIComponent(message);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const deepLink = `whatsapp://send?phone=${phone}&text=${encodedText}`;
      const webLink = `https://wa.me/${phone}?text=${encodedText}`;
      const apiLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;

      let opened = false;

      if (isMobile) {
        const w = window.open(deepLink, '_blank');
        opened = !!w;
      }

      if (!opened) {
        const w = window.open(webLink, '_blank', 'noopener,noreferrer') ||
                  window.open(apiLink, '_blank', 'noopener,noreferrer');
        opened = !!w;
      }

      return true;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
