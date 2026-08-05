import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import StoreHeader from '@/components/store/StoreHeader';
import SearchBar from '@/components/store/SearchBar';
import CategoryStrip from '@/components/store/CategoryStrip';
import ProductCard from '@/components/store/ProductCard';
import BottomNav from '@/components/store/BottomNav';
import CartView from '@/components/store/CartView';
import ProfileView from '@/components/store/ProfileView';
import OwnerDashboard from '@/components/store/OwnerDashboard';
import ProductDetail from '@/components/store/ProductDetail';
import SignInScreen from '@/components/store/SignInScreen';
import OrderTracking from '@/components/store/OrderTracking';
import { ThemeProvider } from '@/components/store/ThemeContext';
import { LanguageProvider } from '@/components/store/LanguageContext';
import { useLanguage } from '@/components/store/LanguageContext';

const HEADPHONES_IMG = 'https://media.base44.com/images/public/6a6b614c7bfcf3a2f0d8fc5c/7ff1b5086_image.jpeg';
const U = (id) => `https://images.unsplash.com/photo-${id}?w=400&q=80&auto=format&fit=crop`;

const allProducts = [
  { name: 'Beats Studio Pro', image: HEADPHONES_IMG, delivery: '2–3 Days', price: '18,990', category: 'Gadgets' },
  { name: 'ANC Headphones', image: U('1583394838336-acd977736f90'), delivery: '2–3 Days', price: '2,499', category: 'Gadgets' },
  { name: 'Mech Keyboard', image: U('1589578228447-e1a4e481c6c8'), delivery: '3–5 Days', price: '3,800', category: 'Gadgets' },
  { name: 'RGB Keyboard', image: U('1595044426077-d36d9236d54a'), delivery: '3–5 Days', price: '4,200', category: 'Gadgets' },
  { name: 'Smart Watch', image: U('1523275335684-37898b6baf30'), delivery: '1–2 Days', price: '1,890', category: 'Gadgets' },
  { name: 'Pro Mouse', image: U('1617233083187-be4925d699d6'), delivery: '2–4 Days', price: '1,200', category: 'Gadgets' },
  { name: 'BT Speaker', image: U('1547052178-7f2c5a20c332'), delivery: '1–2 Days', price: '1,690', category: 'Gadgets' },
  { name: 'Wireless Earbuds', image: U('1563014959-7aaa83350992'), delivery: '1–2 Days', price: '990', category: 'Gadgets' },
  { name: 'Power Bank', image: U('1706275399494-fb26bbc5da63'), delivery: '1–2 Days', price: '890', category: 'Gadgets' },
  { name: 'Mini Speaker', image: U('1582978571763-2d039e56f0c3'), delivery: '1–2 Days', price: '1,290', category: 'Gadgets' },

  { name: 'Cotton Tee', image: U('1521572163474-6864f9cf17ab'), delivery: '2–3 Days', price: '590', category: 'Accessories' },
  { name: 'Black Tee', image: U('1583743814966-8936f5b7be1a'), delivery: '2–3 Days', price: '490', category: 'Accessories' },
  { name: 'White Shirt', image: U('1651761179569-4ba2aa054997'), delivery: '2–4 Days', price: '690', category: 'Accessories' },
  { name: 'Sneakers', image: U('1608229751021-ed4bd8677753'), delivery: '3–5 Days', price: '2,200', category: 'Accessories' },
  { name: 'Low-Top Sneakers', image: U('1544441892-794166f1e3be'), delivery: '3–5 Days', price: '2,500', category: 'Accessories' },
  { name: 'High-Top Shoes', image: U('1512374382149-233c42b6a83b'), delivery: '3–5 Days', price: '2,800', category: 'Accessories' },
  { name: 'Sunglasses', image: U('1511499767150-a48a237f0083'), delivery: '1–2 Days', price: '890', category: 'Accessories' },
  { name: 'Black Shades', image: U('1584036553516-bf83210aa16c'), delivery: '1–2 Days', price: '750', category: 'Accessories' },
  { name: 'Leather Backpack', image: U('1622560480605-d83c853bc5c3'), delivery: '2–3 Days', price: '1,490', category: 'Accessories' },

  { name: 'Desk Lamp', image: U('1579326882518-21eaa7893b02'), delivery: '2–4 Days', price: '1,450', category: 'Daily Essentials' },
  { name: 'Table Lamp', image: U('1570974802254-4b0ad1a755f5'), delivery: '2–4 Days', price: '1,150', category: 'Daily Essentials' },
  { name: 'Silver Lamp', image: U('1582356630861-61bb9b41f541'), delivery: '2–4 Days', price: '1,650', category: 'Daily Essentials' },
  { name: 'Smart Speaker', image: U('1547052178-7f2c5a20c332'), delivery: '1–2 Days', price: '2,190', category: 'Daily Essentials' },
  { name: 'Mini Clock', image: U('1523275335684-37898b6baf30'), delivery: '2–4 Days', price: '690', category: 'Daily Essentials' },

  { name: 'Flash Speaker', image: U('1582978571763-2d039e56f0c3'), delivery: '1–2 Days', price: '1,290', category: 'Deals' },
  { name: 'Budget Earbuds', image: U('1584947114153-e9a2a9ec1501'), delivery: '1–2 Days', price: '690', category: 'Deals' },
  { name: 'Deal Mouse', image: U('1496878632226-93afc36151ab'), delivery: '1–2 Days', price: '590', category: 'Deals' },
  { name: 'Deal Watch', image: U('1523275335684-37898b6baf30'), delivery: '1–2 Days', price: '1,290', category: 'Deals' },
  { name: 'Deal Tee', image: U('1583743814966-8936f5b7be1a'), delivery: '1–2 Days', price: '290', category: 'Deals' },
  { name: 'Deal Shades', image: U('1577803645773-f96470509666'), delivery: '1–2 Days', price: '590', category: 'Deals' },
];

const CAT_KEY = { 'Gadgets': 'catGadgets', 'Accessories': 'catAccessories', 'Daily Essentials': 'catDaily', 'Deals': 'catDeals' };

export default function Home() {
  const { t } = useLanguage();
  const [cart, setCart] = useState([]);
  const [active, setActive] = useState('Home');
  const [activeCategory, setActiveCategory] = useState('Gadgets');
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [signedOut, setSignedOut] = useState(true);
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [ownerProducts, setOwnerProducts] = useState([]);

  useEffect(() => {
    base44.entities.Product.list('-created_date', 100)
      .then(setOwnerProducts)
      .catch(() => {});
  }, []);
  const [address, setAddress] = useState({
    name: 'Juan Dela Cruz',
    phone: '0917 123 4567',
    street: '123 Mabini St., Brgy. Malaya',
    city: 'Quezon City, Metro Manila',
    landmark: 'Near Mabini Elementary School',
  });

  const addToCart = (item) => setCart((current) => [...current, item]);
  const removeFromCart = (index) => setCart((current) => current.filter((_, i) => i !== index));
  const goHome = () => { setSelectedProduct(null); setActive('Home'); };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + Number(String(item.price).replace(/,/g, '')), 0);
    const ref = 'NC-' + Math.floor(1000 + Math.random() * 8999);
    setTrackedOrder({ ref, items: [...cart], total });
    setCart([]);
  };

  const catalog = [...ownerProducts, ...allProducts];
  const searching = query.trim().length > 0;
  const filtered = searching
    ? catalog.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    : catalog.filter((p) => p.category === activeCategory);

  const shell = (children) => (
    <main className="min-h-screen bg-background px-0 py-0 text-foreground sm:grid sm:place-items-center sm:px-6 sm:py-8">
      <div className="flex min-h-screen w-full flex-col overflow-y-auto bg-background shadow-2xl scrollbar-none sm:min-h-[780px] sm:max-w-[390px] sm:rounded-[2.75rem] sm:border-[10px] sm:border-border">
        {children}
      </div>
    </main>
  );

  let content;

  if (trackedOrder) {
    content = <OrderTracking order={trackedOrder} address={address} onDone={() => { setTrackedOrder(null); goHome(); }} />;
  } else if (active === 'Home' && selectedProduct) {
    content = <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} onAdd={addToCart} />;
  } else if (active === 'Cart') {
    content = (
      <CartView
        cart={cart}
        onBack={goHome}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    );
  } else if (active === 'Owner') {
    content = <OwnerDashboard onBack={goHome} />;
  } else if (active === 'Profile') {
    content = <ProfileView onBack={goHome} onSignOut={() => setSignedOut(true)} address={address} onSaveAddress={setAddress} />;
  } else {
    content = (
      <>
        <StoreHeader cartCount={cart.length} onCart={() => setActive('Cart')} />
        <SearchBar value={query} onChange={setQuery} />
        <CategoryStrip active={activeCategory} onChange={(c) => { setActiveCategory(c); setQuery(''); }} />
        <section className="px-4 pb-8 pt-7">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-500">{searching ? t('search') : t('freshPicks')}</p>
              <h2 className="mt-1 text-sm font-bold">{searching ? `"${query.trim()}"` : t(CAT_KEY[activeCategory] || activeCategory)}</h2>
            </div>
            <span className="text-[10px] text-muted-foreground">{filtered.length} {filtered.length === 1 ? t('result') : t('results')}</span>
          </div>
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-xs text-muted-foreground">{t('noProducts')}</p>
          ) : (
            <motion.div
              className="grid grid-cols-2 gap-2.5"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
            >
              {filtered.map((product) => (
                <ProductCard key={product.name} product={product} onAdd={addToCart} onView={setSelectedProduct} />
              ))}
            </motion.div>
          )}
        </section>
        <BottomNav active={active} onChange={setActive} cartCount={cart.length} />
      </>
    );
  }

  if (signedOut) {
    return (
      <LanguageProvider>
        <ThemeProvider>{shell(<SignInScreen onSignedIn={() => setSignedOut(false)} />)}</ThemeProvider>
      </LanguageProvider>
    );
  }

  const screenKey = signedOut ? 'signin' : trackedOrder ? 'tracking' : active === 'Home' && selectedProduct ? 'product' : active;

  return (
    <LanguageProvider>
      <ThemeProvider>
        {shell(
          <motion.div
            key={screenKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {content}
          </motion.div>
        )}
      </ThemeProvider>
    </LanguageProvider>
  );
}
