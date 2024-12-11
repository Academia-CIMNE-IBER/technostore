import React from 'react';
import { useEffect } from 'react';
import { GrowthBook, GrowthBookProvider, useFeature as useGrowthBookFeature } from '@growthbook/growthbook-react';

// Función para obtener la URL actual de forma segura
const getCurrentUrlInfo = () => {
  if (typeof window === 'undefined') return {};
  
  const url = new URL(window.location.href);
  return {
    url: url.href,
    path: url.pathname,
    host: url.hostname,
    query: url.search
  };
};

// Obtener UTM params
const getUtmParams = () => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utmSource: urlParams.get('utm_source') || '',
    utmMedium: urlParams.get('utm_medium') || '',
    utmCampaign: urlParams.get('utm_campaign') || '',
    utmTerm: urlParams.get('utm_term') || '',
    utmContent: urlParams.get('utm_content') || ''
  };
};

const growthbook = new GrowthBook({
  apiHost: "https://gb-api.santilang.dev",
  clientKey: "sdk-K1NUOgDr8TzFcF2w",
  attributes: {
    id: 'anonymous', // Podemos actualizarlo después con el ID del usuario
    ...getCurrentUrlInfo(),
    deviceType: typeof window !== 'undefined' ? 
      (window.innerWidth <= 768 ? 'mobile' : 'desktop') : 'unknown',
    browser: typeof window !== 'undefined' ? 
      (navigator.userAgent.includes('Chrome') ? 'chrome' : 
      navigator.userAgent.includes('Firefox') ? 'firefox' : 
      navigator.userAgent.includes('Safari') ? 'safari' : 'unknown') : 'unknown',
    ...getUtmParams()
  },
  trackingCallback: (experiment, result) => {
    console.log("Experiment tracked:", experiment, result);
  }
});

// Componente Provider
export const ExperimentProvider = ({ children }) => {
  useEffect(() => {
    // Cargar features y log del resultado
    const loadFeatures = async () => {
      try {
        await growthbook.loadFeatures();
        //console.log("Features loaded successfully");
        //console.log("All features:", growthbook.getFeatures());
        //console.log("product-card-badge-design feature:", 
         // growthbook.getFeatureValue("product-card-badge-design", null));
      } catch (error) {
        console.error("Error loading features:", error);
      }
    };

    loadFeatures();
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      {children}
    </GrowthBookProvider>
  );
};

export const updateGrowthBookAttributes = (newAttributes) => {
  growthbook.setAttributes({
    ...growthbook.getAttributes(),
    ...newAttributes
  });
};

// Hook para usar features
export const useFeature = (key) => {
  const feature = useGrowthBookFeature(key);
  return feature;
};