import React from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import CouponInput from './CouponInput';
import PersonalizedDiscount from './PersonalizedDiscount';
import { useCart } from '../../contexts/CartContext';
import { COUPONS } from '../../data/mockData';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, couponCode, setCouponCode } = useCart();
  const [error, setError] = React.useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = COUPONS[couponCode]?.discount || 0;
  const total = subtotal * (1 - discount / 100);

  const handleApplyCoupon = (code) => {
    if (!COUPONS[code]) {
      setError('Código de cupón inválido');
      return;
    }
    setCouponCode(code);
    setError('');
    
    window.growthbook?.track('apply_coupon', {
      experimentId: 'personalized-discount-feature',
      couponCode: code,
      cartValue: subtotal
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Carrito</CardTitle>
      </CardHeader>

      <CardContent>
        {cart.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Tu carrito está vacío
          </p>
        ) : (
          <>
            <PersonalizedDiscount subtotal={subtotal} />
            
            <ScrollArea className="h-[400px] pr-4">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </ScrollArea>
            
            <CouponInput
              onApplyCoupon={handleApplyCoupon}
              error={error}
            />
            
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Cart;