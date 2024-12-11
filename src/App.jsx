import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import { Providers } from './providers/Providers';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider defaultTheme={isDarkMode ? 'dark' : 'light'}>
      <Providers>
          <div className="min-h-screen bg-background">
            <Header 
              onLoginClick={() => setShowLogin(true)} 
              onThemeToggle={handleThemeToggle} 
              isDarkMode={isDarkMode}
            />
            
            {/* Botón flotante para móvil */}
            <div className="fixed bottom-4 right-4 md:hidden z-50">
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button size="lg" className="rounded-full w-14 h-14">
                    <ShoppingCart className="h-6 w-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="p-4 max-h-[90vh] overflow-auto">
                    <Cart onCheckout={() => setIsDrawerOpen(false)} />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            <div className="container mx-auto py-8 px-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <Card>
                    <CardContent className="p-6">
                      <ProductList />
                    </CardContent>
                  </Card>
                </div>
                {/* Carrito visible solo en desktop */}
                <div className="hidden md:block md:col-span-4">
                  <Card>
                    <CardContent className="p-6">
                      <Cart />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <Login open={showLogin} onClose={() => setShowLogin(false)} />
          </div>
      </Providers>
    </ThemeProvider>
  );
}

export default App;