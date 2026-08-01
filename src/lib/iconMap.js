import {
  Users, GraduationCap, Cross, Trees, Building2, Home, Landmark,
  Newspaper, Map, Image as ImageIcon, Play, CalendarDays, Pill, Utensils,
  ShoppingBag, Fuel, Banknote, Hotel, Moon, Church, Star, User, Phone,
} from 'lucide-react';

export const iconMap = {
  Users,
  GraduationCap,
  Cross,
  Trees,
  Building2,
  Home,
  Landmark,
  Newspaper,
  Map,
  Image: ImageIcon,
  Play,
  CalendarDays,
  Pill,
  Utensils,
  ShoppingBag,
  Fuel,
  Banknote,
  Hotel,
  Moon,
  Church,
  Star,
  User,
  Phone,
};

export function resolveIcon(name) {
  if (!name) return null;
  return iconMap[name] || null;
}
