export interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface PaymentData {
  items: CartItem[];
  total: number;
}