import React, { useState, useRef } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard } from 'lucide-react';
import PaymentSuccessDialog from './PaymentSuccessDialog';

// Algoritmo de Luhn para validar números de tarjeta
const validateCardNumber = (number) => {
  const digits = number.replace(/\D/g, '');
  if (digits.length !== 16) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return (sum % 10) === 0;
};

const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const expYear = parseInt(`20${year}`, 10);
  const expMonth = parseInt(month, 10);

  return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
};

const REJECTED_CARD = '4111111111111111';

const PaymentForm = ({ open, onClose }) => {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const expYearRef = useRef(null);
  const cvvRef = useRef(null);
  const cardNumberRef = useRef(null);
  const expMonthRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, '');
    if (name === 'cardNumber') {
      formattedValue = formattedValue.slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.replace(/\s/g, '').length === 16) expMonthRef.current?.focus();
    } else if (name === 'expMonth') {
      formattedValue = value.replace(/\D/g, '').slice(0, 2); // Remueve cualquier carácter no numérico y limita a 2 dígitos

      if (formattedValue.length === 1 && parseInt(formattedValue, 10) > 1) {
        formattedValue = `0${formattedValue}`;
        expYearRef.current?.focus();
      } else if (formattedValue.length === 2) {
        formattedValue = Math.min(parseInt(formattedValue, 10), 12).toString().padStart(2, '0');
        expYearRef.current?.focus();
      }
    } else if (name === 'expYear') {
      formattedValue = value.slice(0, 2);
      if (formattedValue.length === 2) cvvRef.current?.focus();
    } else if (name === 'cvv') {
      formattedValue = value.slice(0, 3);
    }
    setFormData(prev => ({ ...prev, [name]: formattedValue || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!validateCardNumber(cardNumber)) return setError('Número de tarjeta inválido');
    if (!validateExpiryDate(formData.expMonth, formData.expYear)) return setError('Tarjeta vencida');
    if (formData.cvv.length !== 3) return setError('Código de seguridad inválido');

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (cardNumber === REJECTED_CARD) {
        setError('Pago rechazado por la entidad emisora');
        cardNumberRef.current?.focus();
      } else {
        setShowSuccessDialog(true);
      }
    } catch (error) {
      setError('Ocurrió un error procesando el pago');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    clearCart();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && !loading && onClose()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pagar con Tarjeta
            </DialogTitle>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleChange}
                ref={cardNumberRef}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Vencimiento</Label>
                <div className="flex gap-2">
                  <Input name="expMonth" placeholder="MM" value={formData.expMonth} onChange={handleChange} ref={expMonthRef} required />
                  <Input name="expYear" placeholder="YY" value={formData.expYear} onChange={handleChange} ref={expYearRef} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} ref={cvvRef} required />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" disabled={loading}>{loading ? "Procesando..." : "Pagar"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PaymentSuccessDialog open={showSuccessDialog} onClose={handleSuccessClose} />
    </>
  );
};

export default PaymentForm;