import {
  AppleLogo,
  Fish,
  BowlFood,
  Cat,
  SprayBottle,
  Wine,
  CookingPot,
  BowlSteam,
  ShoppingCart,
  HandSoap,
} from "@phosphor-icons/react";

export const categories = [
  { id: "all",       name: "All Products",        icon: null },
  { id: "fruits",    name: "Fruits & Vegetables",  icon: <AppleLogo size={22} weight="thin" /> },
  { id: "meat",      name: "Meat & Fish",          icon: <Fish size={22} weight="thin" /> },
  { id: "snacks",    name: "Snacks",               icon: <BowlFood size={22} weight="thin" /> },
  { id: "petcare",   name: "Pet Care",             icon: <Cat size={22} weight="thin" /> },
  { id: "cleaning",  name: "Home & Cleaning",      icon: <SprayBottle size={22} weight="thin" /> },
  { id: "dairy",     name: "Dairy",                icon: <Wine size={22} weight="thin" /> },
  { id: "cooking",   name: "Cooking",              icon: <CookingPot size={22} weight="thin" /> },
  { id: "breakfast", name: "Breakfast",            icon: <BowlSteam size={22} weight="thin" /> },
  { id: "beverage",  name: "Beverage",             icon: <ShoppingCart size={22} weight="thin" /> },
  { id: "health",    name: "Health & Beauty",      icon: <HandSoap size={22} weight="thin" /> },
];
