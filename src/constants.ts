import { MenuItem, Category } from './types';

export const MENU_DATA: MenuItem[] = [
  // Signature Specials
  { 
    id: 's1', name: 'Soma Special Combo', price: 420, category: 'Signature Specials', 
    description: 'A feast of flavors featuring our signature falafel, pasta, fresh garden salad, and golden fries with house sauce.',
    ingredients: ['Falafel', 'Pasta', 'Mixed Greens', 'Potatoes', 'Signature House Sauce'],
    image: 'https://cdn.phototourl.com/member/2026-04-27-6c45fed7-f9a4-4af4-91eb-b76d97080e33.jpg'
  },
  { 
    id: 's2', name: 'Soma Fasting Combo', price: 350, category: 'Signature Specials', 
    description: 'A traditional fasting delight with falafel, vegetable rice, fresh salad, and spiced lentils.',
    ingredients: ['Falafel', 'Basmati Rice', 'Mixed Vegetables', 'Red Lentils', 'Salad'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 's3', name: 'Chicken Combo Plate', price: 390, category: 'Signature Specials', 
    description: 'Grilled tender chicken served with crispy fries, garden salad, and our creamy garlic dipping sauce.',
    ingredients: ['Grilled Chicken', 'French Fries', 'Garden Salad', 'Garlic Sauce'],
    image: 'https://cdn.phototourl.com/free/2026-04-27-05ae11d7-8d32-4fe3-ae20-73f3869b12d6.jpg'
  },

  // Breakfast
  { 
    id: 'b1', name: 'Firfir', price: 180, category: 'Breakfast / Ethiopian Favorites', 
    description: 'Authentic shredded injera cooked in a savory berbere sauce with clarified butter and spices.',
    ingredients: ['Injera', 'Berbere', 'Niter Kibbeh', 'Onion', 'Garlic'],
    image: 'https://cdn.phototourl.com/member/2026-04-27-8ce832a5-4a1b-4cbe-9240-92f6c548695b.jpg'
  },
  { 
    id: 'b2', name: 'Chechebsa / Kita Firfir', price: 190, category: 'Breakfast / Ethiopian Favorites', 
    description: 'Hand-torn flatbread tossed in niter kibbeh and berbere. Served with honey as an option.',
    ingredients: ['Flatbread', 'Niter Kibbeh', 'Berbere', 'Optional Honey'],
    image: 'https://cdn.phototourl.com/free/2026-04-27-43c8ee89-190b-4e65-a2ed-186222913b28.webp'
  },
  { 
    id: 'b3', name: 'Egg Breakfast', price: 160, category: 'Breakfast / Ethiopian Favorites', 
    description: 'Scrambled or fried eggs served with fresh bread, sliced tomatoes, and onions.',
    ingredients: ['Eggs', 'Fresh Bread', 'Tomato', 'Onion', 'Herbs'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800'
  },

  // Main Course
  { 
    id: 'm1', name: 'Beef Tibs', price: 320, category: 'Main Course', 
    description: 'Sautéed beef cubes with onions, rosemary, and fresh peppers in traditional spices.',
    ingredients: ['Beef', 'Red Onion', 'Rosemary', 'Green Pepper', 'Butter'],
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'm2', name: 'Chicken Dish', price: 280, category: 'Main Course', 
    description: 'Your choice of grilled or fried chicken seasoned with fresh herbs and garlic.',
    ingredients: ['Chicken', 'Fresh Herbs', 'Garlic', 'Special Sauce'],
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'm3', name: 'Fish Fillet', price: 330, category: 'Main Course', 
    description: 'Perfectly seasoned fish fillet with lemon and herbs, served with fries and salad.',
    ingredients: ['Fish Fillet', 'Lemon', 'Herbs', 'Fries', 'Salad'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'm4', name: 'Shawarma', price: 220, category: 'Main Course', 
    description: 'Juicy chicken or beef wrapped in pita with lettuce, tomato, and garlic sauce.',
    ingredients: ['Protein Choice', 'Pita Wrap', 'Lettuce', 'Tomato', 'Garlic Sauce'],
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=800'
  },

  // Fasting Menu
  { 
    id: 'f1', name: 'Falafel Plate', price: 190, category: 'Fasting Menu', 
    description: 'Golden-fried chickpea patties with herbs and garlic, served with creamy tahini.',
    ingredients: ['Chickpeas', 'Fresh Herbs', 'Garlic', 'Tahini Sauce'],
    image: 'https://cdn.phototourl.com/free/2026-04-27-bdd519d4-4f7f-48f3-817b-147e3fdf043a.jpg'
  },
  { 
    id: 'f2', name: 'Vegetable Combo', price: 240, category: 'Fasting Menu', 
    description: 'A traditional mix of shiro, lentils, cabbage, and fresh salad served with injera.',
    ingredients: ['Shiro', 'Lentils', 'Cabbage', 'Salad', 'Injera'],
    image: 'https://cdn.phototourl.com/free/2026-04-27-3cf164dc-9b35-40ef-aa65-4d2c9d9debd2.jpg'
  },
  { 
    id: 'f3', name: 'Pasta Vegan', price: 200, category: 'Fasting Menu', 
    description: 'Pasta in a rich tomato and garlic sauce with garden vegetables and fresh herbs.',
    ingredients: ['Pasta', 'Tomato Sauce', 'Garlic', 'Seasonal Vegetables', 'Herbs'],
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800'
  },

  // Pizza & Pasta
  { id: 'p1', name: 'Margherita Pizza', price: 280, category: 'Pizza & Pasta', description: 'Classic mozzarella cheese, tomato sauce, and aromatic oregano.', ingredients: ['Mozzarella', 'Tomato Sauce', 'Oregano'], image: 'https://cdn.phototourl.com/free/2026-04-27-a612af41-74a5-4acd-ac25-b16c515d7685.jpg' },
  { id: 'p2', name: 'Chicken Pizza', price: 340, category: 'Pizza & Pasta', description: 'Topped with grilled chicken, mozzarella, onions, and olives.', ingredients: ['Chicken', 'Cheese', 'Onion', 'Olives'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', name: 'Spaghetti Bolognese', price: 260, category: 'Pizza & Pasta', description: 'Pasta served with a hearty minced meat sauce and parmesan.', ingredients: ['Spaghetti', 'Minced Meat', 'Tomato Sauce', 'Parmesan'], image: 'https://cdn.phototourl.com/free/2026-04-27-ac6ce0ff-d69c-459e-9487-b5d319563b8a.png' },
  { id: 'p4', name: 'Lasagna', price: 300, category: 'Pizza & Pasta', description: 'Rich layers of pasta, house meat sauce, cheese, and herbs.', ingredients: ['Pasta Layers', 'Meat Sauce', 'Mozzarella', 'Béchamel'], image: 'https://cdn.phototourl.com/free/2026-04-27-514af262-b769-471d-bb3e-5bc5ca114c6b.jpg' },

  // Burgers & Sandwiches
  { id: 'bu1', name: 'Classic Burger', price: 240, category: 'Burgers & Sandwiches', description: 'Beef patty with melted cheese, lettuce, and tomato. Served with fries.', ingredients: ['Beef Patty', 'Cheese', 'Lettuce', 'Tomato', 'Fries'], image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800' },
  { id: 'bu2', name: 'Chicken Burger', price: 250, category: 'Burgers & Sandwiches', description: 'Crispy chicken fillet with mayo sauce and lettuce. Served with fries.', ingredients: ['Chicken Fillet', 'Mayo', 'Lettuce', 'Fries'], image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800' },

  // Salads
  { id: 'sl1', name: 'Fresh Garden Salad', price: 170, category: 'Salads', description: 'Crisp lettuce, tomato, cucumber, and onion with lemon dressing.', ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Onion', 'Lemon Dressing'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
  { id: 'sl2', name: 'Chicken Salad', price: 230, category: 'Salads', description: 'Grilled chicken strips atop fresh greens and cucumber.', ingredients: ['Chicken Strips', 'Mixed Greens', 'Cucumber', 'Special Sauce'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800' },

  // Desserts
  { id: 'd1', name: 'Chocolate Cake', price: 120, category: 'Desserts', ingredients: ['Cocoa', 'Flour', 'Sugar', 'Butter'], image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800' },
  { id: 'd2', name: 'Cheesecake', price: 140, category: 'Desserts', ingredients: ['Cream Cheese', 'Graham Cracker', 'Vanilla'], image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800' },
  { id: 'd3', name: 'Red Velvet Cake', price: 130, category: 'Desserts', ingredients: ['Buttermilk', 'Cocoa', 'Cream Cheese Frosting'], image: 'https://cdn.phototourl.com/member/2026-04-27-619c016d-0eef-4c04-8b9e-27e6a3992d5f.jpg' },
  { id: 'd4', name: 'Fruit Cake', price: 110, category: 'Desserts', ingredients: ['Dried Fruits', 'Spices', 'Nuts'], image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800' },

  // Hot Drinks
  { id: 'h1', name: 'Ethiopian Coffee', price: 55, category: 'Hot Drinks', ingredients: ['Premium Arabica Beans'], image: 'https://cdn.phototourl.com/member/2026-04-27-c0c6b512-62c8-4f59-a24a-0d9983d71af6.jpg' },
  { id: 'h2', name: 'Macchiato', price: 70, category: 'Hot Drinks', ingredients: ['Espresso', 'Steamed Milk'], image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80&w=800' },
  { id: 'h3', name: 'Tea', price: 40, category: 'Hot Drinks', ingredients: ['Black Tea Leaves'], image: 'https://cdn.phototourl.com/member/2026-04-27-d539577c-f0eb-40ad-9e94-c6697719e7c4.jpg' },
  { id: 'h4', name: 'Ginger Tea', price: 50, category: 'Hot Drinks', ingredients: ['Fresh Ginger', 'Tea'], image: 'https://cdn.phototourl.com/member/2026-04-27-6a689f08-296f-40ed-b098-3017d0983376.webp' },
  { id: 'h5', name: 'Milk Tea', price: 55, category: 'Hot Drinks', ingredients: ['Tea', 'Condensed Milk'], image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800' },

  // Cold Drinks
  { id: 'c1', name: 'Mineral Water', price: 30, category: 'Cold Drinks', ingredients: ['Natural Mineral Water'], image: 'https://cdn.phototourl.com/member/2026-04-27-1c644a64-473d-4128-be37-a1fa53d0bd3f.jpg' },
  { id: 'c2', name: 'Soft Drinks (Coke, Sprite, Fanta)', price: 45, category: 'Cold Drinks', ingredients: ['Assorted Carbonated Drinks'], image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800' },
  { id: 'c3', name: 'Fresh Juice', price: 90, category: 'Cold Drinks', description: 'Freshly squeezed seasonal fruits.', ingredients: ['Fresh Seasonal Fruits'], image: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?auto=format&fit=crop&q=80&w=800' },
  { id: 'c4', name: 'Smoothie', price: 120, category: 'Cold Drinks', description: 'Blended fruits with a touch of honey.', ingredients: ['Mixed Fruits', 'Honey', 'Yogurt'], image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&q=80&w=800' },
  { id: 'c5', name: 'Iced Coffee', price: 95, category: 'Cold Drinks', ingredients: ['Espresso', 'Ice', 'Milk'], image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800' },
];

export const CATEGORIES: Category[] = [
  "Signature Specials",
  "Breakfast / Ethiopian Favorites",
  "Main Course",
  "Fasting Menu",
  "Pizza & Pasta",
  "Burgers & Sandwiches",
  "Salads",
  "Desserts",
  "Hot Drinks",
  "Cold Drinks"
];
