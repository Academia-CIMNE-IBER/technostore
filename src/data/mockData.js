export const USERS = {
  'test@techshop.com': { password: 'Test123!', name: 'Test User', role: 'user' },
  'admin@techshop.com': { password: 'Admin789!', name: 'Admin User', role: 'admin' },
  'premium@techshop.com': { password: 'Premium456!', name: 'Premium User', role: 'premium' }
};

export const COLORS = [
  '#F87171', // red-400
  '#60A5FA', // blue-400
  '#34D399', // emerald-400
  '#FBBF24', // yellow-400
  '#A78BFA', // violet-400
  '#FB923C', // orange-400
];

const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const generateImage = (color, text) => {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas.toDataURL('image/png');
};


export const PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    price: 999,
    category: 'Smartphones',
    stock: 10,
    image: generateImage(getRandomColor(), 'iPhone 14 Pro'),
    description: 'Latest iPhone model with advanced features'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    brand: 'Apple',
    price: 1299,
    category: 'Laptops',
    stock: 3,
    image: generateImage(getRandomColor(), 'MacBook Air M2'),
    description: 'Lightweight laptop with M2 chip'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    brand: 'Apple',
    price: 249,
    category: 'Accesorios',
    stock: 15,
    image: generateImage(getRandomColor(), 'AirPods Pro'),
    description: 'Wireless earbuds with noise cancellation'
  },
  {
    id: 4,
    name: 'iPad Air',
    brand: 'Apple',
    price: 599,
    category: 'Tablets',
    stock: 8,
    image: generateImage(getRandomColor(), 'iPad Air'),
    description: 'Versatile tablet for work and entertainment'
  },
  {
    id: 5,
    name: 'Samsung Galaxy S23 Ultra',
    brand: 'Samsung',
    price: 1199,
    category: 'Smartphones',
    stock: 7,
    image: generateImage(getRandomColor(), 'Galaxy S23 Ultra'),
    description: 'Premium Android smartphone with S Pen'
  },
  {
    id: 6,
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    price: 1999,
    category: 'Laptops',
    stock: 0,
    image: generateImage(getRandomColor(), 'MacBook Pro 14"'),
    description: 'Powerful laptop for professionals'
  },
  {
    id: 7,
    name: 'iPad Pro 12.9"',
    brand: 'Apple',
    price: 1099,
    category: 'Tablets',
    stock: 12,
    image: generateImage(getRandomColor(), 'iPad Pro 12.9"'),
    description: 'Large tablet with M2 chip and ProMotion display'
  },
  {
    id: 8,
    name: 'Apple Watch Series 8',
    brand: 'Apple',
    price: 399,
    category: 'Smartwatches',
    stock: 20,
    image: generateImage(getRandomColor(), 'Apple Watch Series 8'),
    description: 'Advanced health and fitness tracking'
  },
  {
    id: 9,
    name: 'Magic Keyboard',
    brand: 'Apple',
    price: 299,
    category: 'Accesorios',
    stock: 0,
    image: generateImage(getRandomColor(), 'Magic Keyboard'),
    description: 'Premium keyboard for iPad Pro'
  },
  {
    id: 10,
    name: 'Samsung Galaxy Watch 5',
    brand: 'Samsung',
    price: 279,
    category: 'Smartwatches',
    stock: 15,
    image: generateImage(getRandomColor(), 'Galaxy Watch 5'),
    description: 'Advanced Android smartwatch'
  },
  {
    id: 11,
    name: 'Dell XPS 13',
    brand: 'Dell',
    price: 1399,
    category: 'Laptops',
    stock: 6,
    image: generateImage(getRandomColor(), 'Dell XPS 13'),
    description: 'Premium Windows ultrabook'
  },
  {
    id: 12,
    name: 'Apple Pencil 2',
    brand: 'Apple',
    price: 129,
    category: 'Accesorios',
    stock: 25,
    image: generateImage(getRandomColor(), 'Apple Pencil 2'),
    description: 'Precise stylus for iPad'
  },
  {
    id: 13,
    name: 'Galaxy Tab S8',
    brand: 'Samsung',
    price: 699,
    category: 'Tablets',
    stock: 9,
    image: generateImage(getRandomColor(), 'Galaxy Tab S8'),
    description: 'Premium Android tablet'
  },
  {
    id: 14,
    name: 'Google Pixel 7 Pro',
    brand: 'Google',
    price: 899,
    category: 'Smartphones',
    stock: 11,
    image: generateImage(getRandomColor(), 'Google Pixel 7 Pro'),
    description: 'Google flagship with advanced AI features'
  },
  {
    id: 15,
    name: 'AirPods Max',
    brand: 'Apple',
    price: 549,
    category: 'Accesorios',
    stock: 7,
    image: generateImage(getRandomColor(), 'AirPods Max'),
    description: 'Premium over-ear headphones'
  }
];

export const CATEGORIES = [
  'Todo',
  'Smartphones',
  'Laptops',
  'Tablets',
  'Smartwatches',
  'Accesorios'
];

export const COUPONS = {
  'WELCOME10': { discount: 10, description: 'Welcome discount 10%' },
  'PREMIUM20': { discount: 20, description: 'Premium members discount 20%' },
  'SUMMER25': { discount: 25, description: 'Summer sale discount 25%' },
  'FLASH15': { discount: 15, description: 'Flash sale discount 15%' },
  'STUDENT30': { discount: 30, description: 'Student discount 30%' }
};

// Nueva data para filtros adicionales si los necesitas
export const BRANDS = [
  'Apple',
  'Samsung',
  'Google',
  'Dell',
  'Microsoft'
];

export const PRICE_RANGES = [
  { label: 'Menos de $300', min: 0, max: 299 },
  { label: '$300 - $599', min: 300, max: 599 },
  { label: '$600 - $999', min: 600, max: 999 },
  { label: '$1000 - $1499', min: 1000, max: 1499 },
  { label: '$1500+', min: 1500, max: Infinity }
];