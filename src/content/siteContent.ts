import atta from "@/assets/products/atta.png";
import brownAtta from "@/assets/products/brown-atta.png";
import maida from "@/assets/products/maida.png";
import rice from "@/assets/products/rice.png";
import soybeanOil from "@/assets/products/soybean-oil.png";
import mustardOil from "@/assets/products/mustard-oil.png";
import riceBranOil from "@/assets/products/rice-bran-oil.png";
import suji from "@/assets/products/suji.png";

export interface ProductItem {
  name: string;
  namebn: string;
  description: string;
  image: string;
}

export interface VideoItem {
  id: string;
  title: string;
}

export interface SiteContent {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    sunshineGold: string;
    akijRed: string;
  };
  hero: {
    line1: string;
    highlight1: string;
    line2: string;
    highlight2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    videos: string[];
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    items: ProductItem[];
  };
  adverts: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    videos: VideoItem[];
  };
  recipes: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    videos: string[];
  };
}

/** HSL values, matching the tokens in index.css */
export const defaultContent: SiteContent = {
  theme: {
    primary: "45 100% 50%",
    secondary: "350 75% 45%",
    accent: "35 95% 55%",
    background: "45 100% 99%",
    foreground: "20 20% 15%",
    sunshineGold: "40 90% 45%",
    akijRed: "350 75% 45%",
  },
  hero: {
    line1: "Made with",
    highlight1: "Love",
    line2: "Served with",
    highlight2: "Care",
    subtitle:
      "From our family to yours — quality staple foods that bring warmth to every Bangladeshi kitchen.",
    primaryCta: "Explore Products",
    secondaryCta: "Why Sunshine",
    videos: ["tpX3wqzPdcA", "sFBlxEwbGTM", "eTpodxrJRzs"],
  },
  products: {
    badge: "Our Products",
    title: "Quality Staples for Your Family",
    subtitle:
      "From breakfast to dinner, Sunshine brings you the finest ingredients to make every meal special.",
    items: [
      { name: "Atta", namebn: "আটা", description: "Premium quality atta for soft, fluffy rotis", image: atta },
      { name: "Brown Atta", namebn: "ব্রাউন আটা", description: "Wholesome brown atta rich in fiber", image: brownAtta },
      { name: "Maida", namebn: "ময়দা", description: "Fine maida for bakery and confectionery", image: maida },
      { name: "Suji", namebn: "সুজি", description: "Fine suji for delicious halwa & desserts", image: suji },
      { name: "Rice", namebn: "চাল", description: "Aromatic Chinigura and premium rice varieties", image: rice },
      { name: "Soybean Oil", namebn: "সয়াবিন তেল", description: "Pure, healthy soybean oil for everyday cooking", image: soybeanOil },
      { name: "Mustard Oil", namebn: "সরিষার তেল", description: "Traditional mustard oil with rich aroma", image: mustardOil },
      { name: "Rice Bran Oil", namebn: "রাইস ব্রান অয়েল", description: "Heart-healthy rice bran oil for your kitchen", image: riceBranOil },
    ],
  },
  adverts: {
    badge: "Media Gallery",
    title: "Watch Our",
    highlight: "Adverts",
    subtitle: "Experience the warmth and quality of Sunshine through our television commercials",
    videos: [
      { id: "tpX3wqzPdcA", title: "Sunshine Advert" },
      { id: "sFBlxEwbGTM", title: "Sunshine Advert" },
      { id: "eTpodxrJRzs", title: "Sunshine Advert" },
      { id: "IEEjAiUorac", title: "Sunshine TVC - Family Moments" },
      { id: "hZgbNkbdCLs", title: "Sunshine TVC - Quality Promise" },
      { id: "OkpKgpvY9gE", title: "Sunshine TVC - Pure Goodness" },
    ],
  },
  recipes: {
    badge: "Recipe Corner",
    title: "Delicious",
    highlight: "Recipes",
    description:
      "Discover mouthwatering recipes crafted with Sunshine products. From traditional Bengali delicacies to modern fusion dishes, explore our collection of quick and easy recipes that bring joy to every meal. Watch, learn, and create culinary magic in your kitchen!",
    videos: ["sqcWOq3eKUM", "DGWgGYii6qs", "dJJB2RjGop4", "c2O9RkeKIFQ", "HWY5pt8piuA"],
  },
};

/** Deep-merges a stored partial over the defaults so new fields never break the site. */
export function mergeContent(stored: unknown): SiteContent {
  const s = (stored ?? {}) as Partial<SiteContent>;
  return {
    theme: { ...defaultContent.theme, ...(s.theme ?? {}) },
    hero: { ...defaultContent.hero, ...(s.hero ?? {}) },
    products: { ...defaultContent.products, ...(s.products ?? {}) },
    adverts: { ...defaultContent.adverts, ...(s.adverts ?? {}) },
    recipes: { ...defaultContent.recipes, ...(s.recipes ?? {}) },
  };
}

/** Extracts a YouTube video id from a full URL or returns the input if already an id. */
export function parseYouTubeId(input: string): string {
  const value = input.trim();
  const match = value.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{6,})/
  );
  return match ? match[1] : value;
}
