import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PaymentForm from './PaymentForm';

const CartSummary = ({ subtotal, discount, total }) => {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento</span>
                <span>-${(subtotal * discount / 100).toFixed(2)} ({discount}%)</span>
              </div>
            )}
            
            <Separator className="my-2" />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => setShowPayment(true)}
          >
            Pagar ${total.toFixed(2)}
          </Button>
        </CardFooter>
      </Card>

      <PaymentForm 
        open={showPayment} 
        onClose={() => setShowPayment(false)} 
      />
    </>
  );
};

export default CartSummary;