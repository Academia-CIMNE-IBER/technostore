import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, BRANDS, PRICE_RANGES } from '../../data/mockData';

const SearchFilters = ({ 
  search, 
  category, 
  brand, 
  priceRange, 
  onSearchChange, 
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange 
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccioná una categoría" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Select value={brand} onValueChange={onBrandChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas las marcas</SelectItem>
            {BRANDS.map(brand => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Rango de precio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los precios</SelectItem>
            {PRICE_RANGES.map((range, index) => (
              <SelectItem key={index} value={`${range.min}-${range.max}`}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;