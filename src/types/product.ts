export interface Brand {
  id: 1;
  name: string;
  created_at: string;
  updated_at: string;
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
  warranty_information: null;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}
