import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { updateGrowthBookAttributes } from '../contexts/GrowthBookContext';

export const useExperiments = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const attributes = {
      id: user?.email || null,
      logged: !!user,
    };

    if (cart?.length > 0) {
      const lastCartUpdate = localStorage.getItem('lastCartUpdate');
      if (lastCartUpdate && Date.now() - parseInt(lastCartUpdate) > 3600000) {
        attributes.cartAbandoned = true;
      }
    }

    updateGrowthBookAttributes(attributes);
  }, [user, cart]);

  useEffect(() => {
    if (cart?.length > 0) {
      localStorage.setItem('lastCartUpdate', Date.now().toString());
    }
  }, [cart]);
};