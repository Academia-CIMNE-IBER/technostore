import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { ExperimentProvider } from '../contexts/GrowthBookContext';
import { useExperiments } from '../hooks/useExperiments';

const ExperimentsInitializer = ({ children }) => {
  useExperiments();
  return children;
};

export const Providers = ({ children }) => {
  return (
    <ExperimentProvider>
      <AuthProvider>
        <CartProvider>
          <ExperimentsInitializer>
            {children}
          </ExperimentsInitializer>
        </CartProvider>
      </AuthProvider>
    </ExperimentProvider>
  );
};