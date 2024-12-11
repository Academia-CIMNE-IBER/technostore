import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccessDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 justify-center text-center">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <span>¡Pago Exitoso!</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 text-center space-y-2">
          <p className="text-muted-foreground">
            Tu pago ha sido procesado correctamente.
          </p>
          <p className="text-muted-foreground">
            Pronto recibirás un email con los detalles del envío.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessDialog;