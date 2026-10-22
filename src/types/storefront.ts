export interface Product {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'bestseller' | 'new' | 'rare' | 'low-light' | 'pet-friendly';
  category: 'roses' | 'marigolds' | 'jatropha' | 'euphorbia' | 'petunias' | 'flowers' | string;
  images: string[];
  description: string;
  shortDescription: string;
  careDetails: {
    light: string;
    water: string;
    temperature: string;
    humidity: string;
    toxicity: string;
  };
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
  species?: 'Roses' | 'Marigolds' | 'Jatropha' | 'Euphorbia' | 'Petunias' | string;
  careLevel?: 'Easy-going' | 'A little attention' | 'Experienced grower';
  sizeCategory?: 'Small - under 30 cm' | 'Medium - 30-60 cm' | 'Large - over 60 cm';
  qualityGrade?: 'Grade A' | 'Grade B';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export interface Feature {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  path: string;
  badge?: string;
}
