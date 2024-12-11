import React from 'react';
import { useFeature } from '../../contexts/GrowthBookContext';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '../../contexts/AuthContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { user } = useAuth();
  
  // Feature flag para nuevo diseño de badge
  const badgeDesign = useFeature('product-card-badge-design');
  
  // Función de tracking
  const trackAddToCart = () => {
    // Enviar evento a GrowthBook
    window.growthbook?.track('add_to_cart', {
      experimentId: 'product-card-badge-design-exp',
      variant: badgeDesign.value,
      productId: product.id,
      price: product.price
    });
    
    onAddToCart(product.id);
  };

  // Diferentes estilos de badges según la variante
  const renderStockBadge = () => {
    switch(badgeDesign?.value) {
      case 'minimal':
        return product.stock > 0 ? (
          <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
            {product.stock} disponibles
          </Badge>
        ) : (
          <Badge variant="destructive" className="bg-red-500/50 backdrop-blur-sm">
            Agotado
          </Badge>
        );
        
      case 'informative':
        return product.stock > 0 ? (
          <Badge variant="secondary" className="flex gap-1 items-center backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            {product.stock < 5 ? `¡Solo ${product.stock} unidades!` : 'En Stock'}
          </Badge>
        ) : (
          <Badge variant="destructive" className="flex gap-1 items-center backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Temporalmente agotado
          </Badge>
        );
        
      default: // Control/original
        return product.stock > 0 ? (
          <Badge variant="secondary" className="backdrop-blur-sm">
            En Stock
          </Badge>
        ) : (
          <Badge variant="destructive" className="backdrop-blur-sm">
            Sin Stock
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-xl line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute bottom-2 right-2">
            {renderStockBadge()}
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-2xl font-bold">
              ${product.price}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.stock} unidades disponibles
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          variant={!user || product.stock === 0 ? "secondary" : "default"}
          disabled={!user || product.stock === 0}
          onClick={trackAddToCart}
        >
          {!user ? "Inicia para Comprar" : product.stock === 0 ? "Sin Stock" : "Añadir al Carrito"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;