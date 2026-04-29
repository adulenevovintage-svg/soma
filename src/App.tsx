/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import type { FormEvent, MouseEvent } from 'react';
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
  RefreshCw,
  Wine,
  IceCream,
  Star,
  Leaf,
  ShoppingBag,
  Coffee,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Copy,
  CreditCard
} from 'lucide-react';
import { MENU_DATA, CATEGORIES } from './constants';
import { MenuItem, Category } from './types';
import { db, auth, handleFirestoreError, OperationType } from './lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  setDoc
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

// Helper to get icons for Ethiopian categories
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
  
  // Admin State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);

  // Firestore Data State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  // Initialize Auth & Data
  useEffect(() => {
    const q = query(collection(db, 'menuItems'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as MenuItem));
      
      // If Firestore is empty and we haven't synced yet, seed it
      if (items.length === 0 && isSyncing) {
        console.log(`Database is empty. Seeding defaults...`);
        seedDatabase();
      } else {
        setMenuItems(items);
        setIsSyncing(false);
      }
    }, (error) => {
      console.error("Snapshot error:", error);
      setMenuItems(MENU_DATA);
      setIsSyncing(false);
    });

    return () => unsubscribe();
  }, [isSyncing]);

  const seedDatabase = async () => {
    try {
      console.log("Seeding database...");
      for (const item of MENU_DATA) {
        const itemRef = doc(db, 'menuItems', item.id);
        await setDoc(itemRef, item);
      }
      console.log("Seeding complete.");
    } catch (err) {
      console.error("Seed error detail:", err);
      // Fallback to static if it truly fails
      setMenuItems(MENU_DATA);
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredItems = useMemo(() => {
    const list = menuItems.length > 0 ? menuItems : MENU_DATA;
    return list.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, menuItems]);

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'soma2024') {
      setIsAdminMode(true);
      setShowLoginModal(false);
      setAdminPassword('');
    } else {
      alert("Invalid password");
    }
  };

  const handleSaveItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.price || !editingItem.category) return;

    try {
      if (editingItem.id) {
        const itemRef = doc(db, 'menuItems', editingItem.id);
        await updateDoc(itemRef, editingItem);
      } else {
        const newItem = {
          ...editingItem,
          id: `new-${Date.now()}`,
          ingredients: editingItem.ingredients || []
        } as MenuItem;
        await addDoc(collection(db, 'menuItems'), newItem);
      }
      setShowEditModal(false);
      setEditingItem(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'menuItems');
    }
  };

  const handleDeleteItem = async (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await deleteDoc(doc(db, 'menuItems', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `menuItems/${id}`);
    }
  };

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

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-8 mr-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark/50">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>Open: 07:00 - 22:00</span>
              </div>
              <div className="h-6 w-px bg-brand-orange/20" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark/50">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>Bole Bulbula</span>
              </div>
            </div>

            <button 
              onClick={() => isAdminMode ? setIsAdminMode(false) : setShowLoginModal(true)}
              className={`p-3 rounded-xl transition-all ${
                isAdminMode 
                ? 'bg-brand-orange text-white shadow-lg' 
                : 'bg-brand-light text-brand-dark/20 hover:text-brand-orange hover:bg-white'
              }`}
            >
              <Settings className={`w-5 h-5 ${isAdminMode ? 'animate-spin-slow' : ''}`} />
            </button>
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

        {/* Search & Admin Actions */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          {isAdminMode && (
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button 
                onClick={() => {
                  setEditingItem({ name: '', price: 0, category: 'Main Course', description: '', ingredients: [], image: '' });
                  setShowEditModal(true);
                }}
                className="px-6 py-3 bg-brand-dark text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-orange transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Dish
              </button>
              <button 
                onClick={() => {
                  if (confirm("This will restore the original menu. Continue?")) {
                    seedDatabase();
                  }
                }}
                className="px-6 py-3 bg-brand-light border border-brand-orange/20 text-brand-orange rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Restore Originals
              </button>
            </div>
          )}
          <div className="relative w-full max-w-xs ml-auto">
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
                className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10"
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
                      
                      <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-brand-orange text-white px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-display font-bold shadow-xl text-xs md:text-base">
                        {item.price} <span className="text-[8px] md:text-[10px] font-medium opacity-80 uppercase">ETB</span>
                      </div>

                      {isAdminMode && (
                        <div className="absolute top-4 left-4 flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItem(item);
                              setShowEditModal(true);
                            }}
                            className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-brand-dark hover:text-brand-orange transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleDeleteItem(item.id, e)}
                            className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 md:p-8">
                      <div className="flex justify-between items-center mb-3 md:mb-4 text-brand-orange text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                        <span>{item.category}</span>
                      </div>
                      
                      <h4 className="text-sm md:text-2xl font-display font-bold text-brand-dark group-hover:text-brand-orange transition-colors mb-2 md:mb-4">
                        {item.name}
                      </h4>
                      
                      <p className="text-brand-dark/50 text-[10px] md:text-sm leading-relaxed mb-3 md:mb-6 font-light line-clamp-2">
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
      
      {/* Floating Pay Now Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={() => setShowPaymentModal(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 bg-brand-dark text-white rounded-2xl shadow-2xl hover:bg-brand-orange transition-all active:scale-95 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div className="relative flex items-center gap-3">
          <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-display font-medium uppercase tracking-widest text-[10px]">Pay Now</span>
        </div>
      </motion.button>

      {/* Admin Modals */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-brand-dark">Payment Options</h3>
                    <p className="text-brand-dark/50 text-xs uppercase tracking-widest font-bold mt-1">Soma Restaurant</p>
                  </div>
                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="p-3 bg-brand-light rounded-xl hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Telebirr */}
                  <a 
                    href="tel:+251933307614"
                    className="flex items-center gap-4 p-4 bg-brand-light rounded-2xl border border-brand-orange/10 hover:border-brand-orange transition-all group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-1">
                      <img 
                        src="https://cdn.phototourl.com/member/2026-04-29-f3c7786b-4d31-4e77-9dd4-9d79a82200df.jpg" 
                        alt="Telebirr" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-bold text-brand-dark">Telebirr</p>
                      <p className="text-[10px] text-brand-dark/50 font-bold uppercase tracking-tighter">+251 933 307 614</p>
                    </div>
                    <div className="p-2 bg-brand-orange text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4 rotate-45" />
                    </div>
                  </a>

                  {/* Bank Accounts */}
                  <div className="p-6 bg-brand-dark rounded-2xl text-white space-y-6">
                    <div className="group/bank relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                            <img 
                              src="https://cdn.phototourl.com/member/2026-04-29-2ab185fb-529b-4c8a-8bcc-5b1aa22268b0.png" 
                              alt="CBE Logo" 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-orange leading-tight">Commercial Bank <br/> of Ethiopia</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard('100001256237', 'cbe')}
                          className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                          title="Copy Account Number"
                        >
                          {copiedId === 'cbe' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white/40" />}
                        </button>
                      </div>
                      <p className="text-lg font-mono font-bold tracking-wider">100001256237</p>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="group/bank relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                            <img 
                              src="https://cdn.phototourl.com/member/2026-04-29-21ae147a-cafc-4c72-ba8a-8395f2a0b84f.png" 
                              alt="Abyssinia Logo" 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-orange leading-tight">Bank of <br/> Abyssinia</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard('1000004758696', 'boa')}
                          className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                          title="Copy Account Number"
                        >
                          {copiedId === 'boa' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white/40" />}
                        </button>
                      </div>
                      <p className="text-lg font-mono font-bold tracking-wider">1000004758696</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full mt-8 py-4 bg-brand-orange text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:shadow-lg hover:shadow-brand-orange/20 transition-all active:scale-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-display font-bold text-brand-dark mb-6">Admin Access</h3>
              <form onSubmit={handleAdminLogin}>
                <input 
                  type="password" 
                  autoFocus
                  placeholder="Enter Password..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-brand-light border border-brand-orange/20 rounded-xl px-5 py-4 text-brand-dark focus:outline-none focus:border-brand-orange mb-6"
                />
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowLoginModal(false)}
                    className="flex-1 px-6 py-4 bg-brand-light text-brand-dark rounded-xl font-bold text-[10px] uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-4 bg-brand-orange text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-brand-orange/30"
                  >
                    Enter
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showEditModal && editingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative bg-[#FFFCF9] w-full max-w-2xl rounded-3xl p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-3xl font-display font-bold text-brand-dark mb-8">
                {editingItem.id ? 'Edit Dish' : 'Add New Dish'}
              </h3>
              
              <form onSubmit={handleSaveItem} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Dish Name</label>
                    <input 
                      required
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      className="w-full bg-white border border-brand-orange/10 rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Price (ETB)</label>
                    <input 
                      required
                      type="number"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})}
                      className="w-full bg-white border border-brand-orange/10 rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Category</label>
                  <select 
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value as Category})}
                    className="w-full bg-white border border-brand-orange/10 rounded-xl px-4 py-3 text-sm"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Description</label>
                  <textarea 
                    required
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    className="w-full bg-white border border-brand-orange/10 rounded-xl px-4 py-3 text-sm h-24 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Photo URL</label>
                  <input 
                    required
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                    className="w-full bg-white border border-brand-orange/10 rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Ingredients (Comma separated)</label>
                  <input 
                    value={editingItem.ingredients?.join(', ')}
                    onChange={(e) => setEditingItem({...editingItem, ingredients: e.target.value.split(',').map(s => s.trim())})}
                    placeholder="e.g. Flour, Sugar, Butter"
                    className="w-full bg-white border border-brand-orange/10 rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-8 py-4 bg-brand-light text-brand-dark rounded-xl font-bold text-[10px] uppercase tracking-widest"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-8 py-4 bg-brand-dark text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-colors"
                  >
                    Save Dish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

