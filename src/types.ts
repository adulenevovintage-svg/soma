export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  ingredients?: string[];
}

export type Category = 
  | "Signature Specials"
  | "Breakfast / Ethiopian Favorites"
  | "Main Course"
  | "Fasting Menu"
  | "Pizza & Pasta"
  | "Burgers & Sandwiches"
  | "Salads"
  | "Desserts"
  | "Hot Drinks"
  | "Cold Drinks";
