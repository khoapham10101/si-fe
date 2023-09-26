export interface Brand {
  id: 1;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BrandDropdown {
  id: 1;
  name: string;
}

export interface ProductImage {
  path: string;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand_id: number;
  brand: Brand;
  description: string | null;
  price: number;
  quantity: number;
  delivery_infomation: string | null;
  warranty_information: string | null;
  images: ProductImage[];
  is_wishlist: boolean;
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}
