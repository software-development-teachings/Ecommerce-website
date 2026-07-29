/**
 * MORPHEUS — Central Products Database
 * Serves as the single source of truth across Catalog, Product Details, and Cart pages.
 */
const PRODUCTS = [
  {
    id: 'morpheus-101',
    name: 'Aether Mohair Knit Cardigan',
    category: 'cardigans',
    price: 280,
    rating: 4.9,
    isFeatured: true,
    badge: 'Limited Drop',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '30% Superkid Mohair, 30% Merino Wool, 40% Recycled Nylon',
    weight: '450 GSM',
    description: 'A surrealist brushed mohair cardigan featuring a relaxed drop-shoulder silhouette, custom engraved horn buttons, and an cloud-soft tactile texture.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'morpheus-102',
    name: 'Somnium Heavyweight Zip Hoodie',
    category: 'hoodies',
    price: 210,
    rating: 4.8,
    isFeatured: true,
    badge: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '100% Organic French Terry Cotton',
    weight: '520 GSM',
    description: 'Ultra-heavyweight boxy fit hoodie with double-lined hood, seamless side panels, and matte black dual-zipper hardware.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'morpheus-103',
    name: 'Lucid Dreams Oversized Tee',
    category: 'tees',
    price: 95,
    rating: 4.7,
    isFeatured: true,
    badge: 'Core Essential',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '100% Combed Ring-Spun Cotton',
    weight: '280 GSM',
    description: 'Preshrunk heavyweight luxury t-shirt featuring dropped shoulder seams and subtle typography screen-printed on the rear spine.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'morpheus-104',
    name: 'Hypnos Tailored Trench Coat',
    category: 'outerwear',
    price: 490,
    rating: 5.0,
    isFeatured: false,
    badge: 'Runway Piece',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '100% Structured Gabardine Wool with Cupro Lining',
    weight: '600 GSM',
    description: 'Double-breasted trench coat with storm flaps, deep welt pockets, and an extended length silhouette built for fluid motion.',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'morpheus-105',
    name: 'Eclipse Jacquard Crewneck Sweater',
    category: 'cardigans',
    price: 240,
    rating: 4.6,
    isFeatured: false,
    badge: 'New Arrival',
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '80% Wool, 20% Cashmere',
    weight: '380 GSM',
    description: 'Custom knit jacquard sweater depicting abstract dreamscape patterns with ribbed cuffs and hem.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'morpheus-106',
    name: 'Phantom Tactical Cargo Trousers',
    category: 'outerwear',
    price: 185,
    rating: 4.8,
    isFeatured: false,
    badge: 'Popular',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Water-Resistant Cotton-Nylon Blend',
    weight: '320 GSM',
    description: 'Relaxed fit trousers with adjustable ankle toggles, deep magnetic cargo pockets, and reinforced knee panelling.',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

// Helper Function: Find Product by ID
function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}