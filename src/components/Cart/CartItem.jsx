import React from 'react';
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-muted-foreground">
            ${item.price}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          
          <span className="w-8 text-center">{item.quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="mx-2 h-8" />
          
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onRemove(item.id)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;