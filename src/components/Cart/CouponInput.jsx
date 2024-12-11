import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CouponInput = ({ onApplyCoupon, error }) => {
  const [code, setCode] = useState('');

  const handleApply = () => {
    onApplyCoupon(code);
  };

  return (
    <div className="mt-4 space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex gap-2">
        <Input
          placeholder="Cargá tu código de cupón"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button variant="secondary" onClick={handleApply}>
          Aplicar
        </Button>
      </div>
    </div>
  );
};

export default CouponInput;