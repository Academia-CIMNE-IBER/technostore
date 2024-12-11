import React from 'react';
import { useFeature } from '@growthbook/growthbook-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingBag, Sparkles } from "lucide-react";

const PersonalizedDiscount = ({ subtotal }) => {
  const discountFeature = useFeature('personalized-discount-feature');
  
  if (!discountFeature?.value) return null;
  
  const { type, amount, expiresIn } = discountFeature.value;
  
  const getDiscountAlert = () => {
    switch(type) {
      case 'abandoned_cart':
        return (
          <Alert className="bg-orange-100 border-orange-200 dark:bg-orange-900/20">
            <Clock className="h-4 w-4" />
            <AlertTitle>¡No pierdas tu carrito!</AlertTitle>
            <AlertDescription>
              Completá tu compra en las próximas {expiresIn} horas y obtené un {amount}% de descuento.
            </AlertDescription>
            <Button variant="default" className="mt-2 bg-orange-500 hover:bg-orange-600">
              Aprovechar Descuento
            </Button>
          </Alert>
        );
        
      case 'loyalty_reward':
        return (
          <Alert className="bg-purple-100 border-purple-200 dark:bg-purple-900/20">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>¡Regalo para clientes frecuentes!</AlertTitle>
            <AlertDescription>
              Por ser un cliente especial, te regalamos un {amount}% en tu próxima compra.
            </AlertDescription>
            <Button variant="default" className="mt-2 bg-purple-500 hover:bg-purple-600">
              Aplicar Regalo
            </Button>
          </Alert>
        );
        
      case 'high_value':
        return (
          <Alert className="bg-blue-100 border-blue-200 dark:bg-blue-900/20">
            <ShoppingBag className="h-4 w-4" />
            <AlertTitle>¡Descuento especial!</AlertTitle>
            <AlertDescription>
              Por tu compra mayor a ${subtotal}, te damos un {amount}% de descuento adicional.
            </AlertDescription>
            <Button variant="default" className="mt-2 bg-blue-500 hover:bg-blue-600">
              Aplicar Descuento
            </Button>
          </Alert>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      {getDiscountAlert()}
    </div>
  );
};

export default PersonalizedDiscount;