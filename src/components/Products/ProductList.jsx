import React from 'react';
import ProductCard from './ProductCard';
import SearchFilters from './SearchFilters';
import { useCart } from '../../contexts/CartContext';
import { PRODUCTS, PRICE_RANGES } from '../../data/mockData';

const ProductList = () => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('Todo');
  const [brand, setBrand] = React.useState('Todas');
  const [priceRange, setPriceRange] = React.useState('all');
  const { addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Todo' || product.category === category;
    const matchesBrand = brand === 'Todas' || product.brand === brand;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      matchesPrice = product.price >= min && (max === Infinity ? true : product.price <= max);
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Construir el mensaje de resultados
  const buildResultsMessage = () => {
    const total = filteredProducts.length;
    const hasFilters = search || category !== 'Todo' || brand !== 'Todas' || priceRange !== 'all';
    
    if (!hasFilters) {
      return "";
    }

    const activeFilters = [];
    if (search) activeFilters.push(`búsqueda "${search}"`);
    if (category !== 'Todo') activeFilters.push(`categoría "${category}"`);
    if (brand !== 'Todas') activeFilters.push(`marca "${brand}"`);
    if (priceRange !== 'all') {
      const range = PRICE_RANGES.find(r => `${r.min}-${r.max}` === priceRange);
      if (range) activeFilters.push(`precio "${range.label}"`);
    }

    const filterText = activeFilters.length 
      ? ` para ${activeFilters.join(', ')}`
      : '';

    return `${total} ${total === 1 ? 'resultado' : 'resultados'}${filterText}`;
  };

  return (
    <div className="container mx-auto p-6">
      <SearchFilters
        search={search}
        category={category}
        brand={brand}
        priceRange={priceRange}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onBrandChange={setBrand}
        onPriceRangeChange={setPriceRange}
      />
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {buildResultsMessage()}
        </p>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron productos que coincidan con los filtros seleccionados.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;