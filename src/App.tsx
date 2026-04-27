/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Utensils, 
  Flame, 
  Pizza, 
  Check,
  X,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Info,
  Wine,
  IceCream,
  Star,
  Leaf,
  ShoppingBag,
  Coffee
} from 'lucide-react';
import { MENU_DATA, CATEGORIES } from './constants';
import { MenuItem, Category } from './types';

// Helper to get icons for Italian categories
const getCategoryIcon = (category: Category) => {
  switch (category) {
    case "Signature Specials": return <Star className="w-5 h-5" />;
    case "Breakfast / Ethiopian Favorites": return <Clock className="w-5 h-5" />;
    case "Main Course": return <Utensils className="w-5 h-5" />;
    case "Fasting Menu": return <Leaf className="w-5 h-5" />;
    case "Pizza & Pasta": return <Pizza className="w-5 h-5" />;
    case "Burgers & Sandwiches": return <ShoppingBag className="w-5 h-5" />;
    case "Salads": return <Flame className="w-5 h-5" />;
    case "Desserts": return <IceCream className="w-5 h-5" />;
    case "Hot Drinks": return <Coffee className="w-5 h-5" />;
    case "Cold Drinks": return <Wine className="w-5 h-5" />;
    default: return <Utensils className="w-5 h-5" />;
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 bg-brand-light/95 backdrop-blur-xl border-b border-brand-orange/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full shadow-xl shadow-brand-orange/20 border-2 border-brand-orange/20 cursor-pointer"
            >
              <img 
                src="https://cdn.phototourl.com/free/2026-04-27-1ceaf8c4-b563-4372-9717-46b05de2c956.jpg" 
                alt="SOMA Logo" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl tracking-tight font-display font-bold text-brand-dark leading-none">
                SOMA
              </h1>
              <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand-dark/40 font-bold mt-1">Premium Dining Experience</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark/50">
              <Clock className="w-4 h-4 text-brand-orange" />
              <span>Open: 07:00 - 22:00</span>
            </div>
            <div className="h-6 w-px bg-brand-orange/20" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark/50">
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span>Bole Bulbula, Addis Ababa</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Experience */}
        <section className="mb-12 md:mb-16">
          <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden group shadow-2xl">
            <div className="aspect-[16/10] md:aspect-[21/9] w-full">
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
                alt="Header" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent" />
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-20 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 backdrop-blur-md border border-brand-orange/30 text-brand-orange text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
                  <Star className="w-3 h-3 fill-current" />
                  Premium Culinary Destination
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-medium leading-[1.1] mb-4 md:mb-6">
                  Taste the <br className="hidden md:block" /> <span className="italic font-light">Extraordinary</span>
                </h2>
                <p className="text-white/70 text-sm md:text-lg mb-6 md:mb-8 font-light leading-relaxed max-w-sm md:max-w-none">
                  Welcome to SOMA. Explore our curated selection of signature plates and traditional favorites.
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="px-5 py-2.5 bg-brand-orange text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-brand-orange/20">
                    Explore Menu
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-10 md:mb-16 sticky top-24 z-30 py-4 bg-brand-light/95 backdrop-blur-md -mx-4 md:-mx-6 px-4 md:px-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] whitespace-nowrap transition-all border ${
                selectedCategory === 'All' 
                ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/30' 
                : 'bg-[#FFFCF9] border-brand-orange/10 text-brand-dark/60 hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              All Selection
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] whitespace-nowrap transition-all border flex items-center gap-2 md:gap-3 ${
                  selectedCategory === cat 
                  ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/30' 
                  : 'bg-[#FFFCF9] border-brand-orange/10 text-brand-dark/60 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {getCategoryIcon(cat)}
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Search Helper */}
        <div className="mb-10 flex justify-end">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/20 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFCF9] border border-brand-orange/10 rounded-xl py-3 pl-10 pr-4 text-sm text-brand-dark placeholder:text-brand-dark/20 focus:outline-none focus:border-brand-orange transition-all"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <section className="mb-24">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedDish(item)}
                    className="glass-card cursor-pointer group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-4 right-4 bg-brand-orange text-white px-4 py-2 rounded-xl font-display font-bold shadow-xl">
                        {item.price} <span className="text-[10px] font-medium opacity-80 uppercase">ETB</span>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-center mb-3 md:mb-4 text-brand-orange text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                        <span>{item.category}</span>
                      </div>
                      
                      <h4 className="text-xl md:text-2xl font-display font-bold text-brand-dark group-hover:text-brand-orange transition-colors mb-3 md:mb-4">
                        {item.name}
                      </h4>
                      
                      <p className="text-brand-dark/50 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-light line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-brand-orange/5">
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-orange">Recipe Details</span>
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-brand-orange opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-32 border-2 border-dashed border-brand-orange/10 rounded-[3rem]">
                <Search className="w-16 h-16 text-brand-orange/10 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-brand-dark/40 uppercase">No Items Found</h3>
                <p className="text-brand-dark/30">Try a different search term or category.</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Ingredient Insight Modal */}
      <AnimatePresence>
        {selectedDish && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="fixed inset-0 bg-brand-dark/80 backdrop-blur-xl z-[100] cursor-zoom-out"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-2 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] bg-[#FFFCF9] z-[110] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-orange/20 overflow-y-auto max-h-[95vh] md:max-h-none"
            >
              <div className="flex flex-col md:flex-row min-h-full">
                <div className="md:w-1/2 h-56 md:h-auto relative overflow-hidden">
                  <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/60 to-transparent flex flex-col justify-end p-6 md:p-10">
                    <h3 className="text-white text-3xl md:text-4xl font-display font-medium leading-none">{selectedDish.name}</h3>
                    <p className="text-white/60 mt-2 font-display uppercase tracking-widest text-[10px] font-bold">{selectedDish.category}</p>
                  </div>
                </div>

                <div className="md:w-1/2 p-6 md:p-16 flex flex-col">
                  <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-orange/10 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-orange">
                      <Utensils className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <button 
                      onClick={() => setSelectedDish(null)}
                      className="p-2 md:p-3 bg-brand-light hover:bg-brand-orange/10 rounded-full transition-colors group"
                    >
                      <X className="w-5 h-5 md:w-6 md:h-6 text-brand-dark group-hover:text-brand-orange" />
                    </button>
                  </div>

                  <div className="mb-8 md:mb-10">
                    <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-3 md:mb-4">Dish Description</h5>
                    <p className="text-brand-dark/60 text-base md:text-lg leading-relaxed font-light">
                      {selectedDish.description}
                    </p>
                  </div>

                  <div className="flex-grow">
                    <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-4 md:mb-6">Key Ingredients</h5>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {selectedDish.ingredients?.map((ing, idx) => (
                        <div key={idx} className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-3 bg-brand-light border border-brand-orange/5 rounded-xl md:rounded-2xl">
                          <Check className="w-3 h-3 text-brand-orange" />
                          <span className="text-[10px] md:text-xs font-bold text-brand-dark/80">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-brand-orange/10 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] md:text-[10px] text-brand-dark/40 font-bold uppercase tracking-tight">Current Price</p>
                      <p className="text-lg md:text-xl font-display font-bold text-brand-orange">{selectedDish.price} ETB</p>
                    </div>
                    <button 
                      onClick={() => setSelectedDish(null)}
                      className="px-6 py-2.5 md:px-8 md:py-3 bg-brand-dark text-white rounded-lg md:rounded-xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-brand-dark text-white/40 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 overflow-hidden rounded-full border border-white/20">
                  <img 
                    src="https://cdn.phototourl.com/free/2026-04-27-1ceaf8c4-b563-4372-9717-46b05de2c956.jpg" 
                    alt="SOMA Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white leading-none">SOMA</h2>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-brand-orange font-bold mt-1">Dining & Lifestyle</p>
                </div>
              </div>
              <p className="text-sm font-light text-white/30 leading-relaxed">
                Elevating the culinary landscape of Addis Ababa with premium ingredients and impeccable service.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Contact Info</h4>
              <div className="space-y-4">
                <a href="tel:+251911000000" className="block text-lg text-white hover:text-brand-orange transition-colors font-display">
                  +251 911 00 00 00
                </a>
                <p className="text-xs font-light">info@somatrust.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Found At</h4>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed font-light">
                  Bole Bulbula District<br />
                  Addis Ababa, Ethiopia<br />
                  Federal Region 1
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8">Service Hours</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-light">Daily</span>
                  <span className="text-white">07:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">
              © 2024 SOMA Restaurant Addis. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

