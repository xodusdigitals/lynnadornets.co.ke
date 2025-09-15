import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { CustomerDetails } from '@/types/product';
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, checkout, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: 'Kenya',
    deliveryType: 'local',
    paymentMethod: 'cash',
    notes: ''
  });

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const success = await checkout(customerDetails);
      if (success) {
        clearCart();
        setShowCheckout(false);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setShowCheckout(false);
    setShowSuccess(false);
  };

  const isFormValid = () => {
    return customerDetails.name && customerDetails.phone && customerDetails.email && customerDetails.address && customerDetails.city && customerDetails.paymentMethod;
  };

  if (cartItems.length === 0 && !showCheckout && !showSuccess) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60%]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              <Button onClick={handleClose}>Continue Shopping</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (showSuccess) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Order Placed Successfully!</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60%]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <MessageCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Thank You!</h3>
              <p className="text-muted-foreground mb-4">Your order has been successfully placed and sent to our team.</p>
              <p className="text-sm text-muted-foreground mb-6">We'll contact you shortly to confirm your order details and arrange delivery.</p>
              <Button onClick={handleClose}>Continue Shopping</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className={`w-[400px] sm:w-[540px] flex flex-col ${showCheckout ? 'checkout-bg' : ''}`}>
        <SheetHeader>
          <SheetTitle className={showCheckout ? 'text-white' : ''}>{showCheckout ? 'Checkout' : 'Your Cart'}</SheetTitle>
        </SheetHeader>

        {!showCheckout ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">KSH {item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center font-medium text-lg">
                <span>Total</span>
                <span>KSH {getTotalPrice().toLocaleString()}</span>
              </div>
              
              <Button 
                onClick={() => setShowCheckout(true)} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Check Out
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Checkout Form */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone *</Label>
                  <Input
                    id="phone"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+254700000000"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-white">Address *</Label>
                <Input
                  id="address"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-white">City *</Label>
                  <Input
                    id="city"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-white">Country</Label>
                  <Input
                    id="country"
                    value={customerDetails.country}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Country"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="delivery" className="text-white">Delivery Type</Label>
                <Select
                  value={customerDetails.deliveryType}
                  onValueChange={(value: 'local' | 'international') => 
                    setCustomerDetails(prev => ({ ...prev, deliveryType: value }))
                  }
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Delivery (Kenya)</SelectItem>
                    <SelectItem value="international">International Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="payment" className="text-white">Payment Method *</Label>
                <Select
                  value={customerDetails.paymentMethod}
                  onValueChange={(value: 'cash' | 'mpesa-delivery' | 'mpesa-now') => 
                    setCustomerDetails(prev => ({ ...prev, paymentMethod: value }))
                  }
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash on Delivery</SelectItem>
                    <SelectItem value="mpesa-delivery">M-Pesa on Delivery</SelectItem>
                    <SelectItem value="mpesa-now">Pay Now (M-Pesa)</SelectItem>
                  </SelectContent>
                </Select>
                {customerDetails.paymentMethod === 'mpesa-delivery' && (
                  <div className="mt-2 p-3 bg-white/10 rounded-md text-sm text-white">
                    <p className="font-medium">M-Pesa Payment Details:</p>
                    <p>Pay Bill No: <span className="font-mono">247247</span></p>
                    <p>Account No: <span className="font-mono">0700060496</span></p>
                    <p>Account Name: Lynn Adornets</p>
                  </div>
                )}
                {customerDetails.paymentMethod === 'mpesa-now' && (
                  <div className="mt-2 p-3 bg-white/10 rounded-md text-sm text-white">
                    <p className="font-medium">Pay Now via M-Pesa:</p>
                    <p>Pay Bill No: <span className="font-mono">247247</span></p>
                    <p>Account No: <span className="font-mono">0700060496</span></p>
                    <p>Account Name: Lynn Adornets</p>
                    <p className="text-orange-300 font-medium mt-1">Please complete payment before confirming order</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="notes" className="text-white">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={customerDetails.notes}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special instructions..."
                  rows={3}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>

              {/* Order Summary */}
              <div className="border-t border-white/20 pt-4 space-y-2">
                <h4 className="font-medium text-white">Order Summary</h4>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-white">
                    <span>{item.name} (×{item.quantity})</span>
                    <span>KSH {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium text-lg border-t border-white/20 pt-2 text-white">
                  <span>Total</span>
                  <span>KSH {getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Checkout Actions */}
            <div className="border-t border-white/20 pt-4 space-y-2">
              <Button 
                onClick={handleCheckout}
                disabled={!isFormValid() || isSubmitting}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCheckout(false)}
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Back to Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};