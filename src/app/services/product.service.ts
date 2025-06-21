import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Smartphone Samsung Galaxy', price: 899.99, quantity: 0 },
    { id: 2, name: 'Notebook Dell Inspiron', price: 1299.99, quantity: 0 },
    { id: 3, name: 'Headphone Sony WH-1000XM4', price: 349.99, quantity: 0 },
    { id: 4, name: 'Tablet iPad Air', price: 599.99, quantity: 0 },
    { id: 5, name: 'Smart TV 55" LG', price: 699.99, quantity: 0 },
    { id: 6, name: 'PlayStation 5', price: 499.99, quantity: 0 },
    { id: 7, name: 'Apple Watch Series 9', price: 399.99, quantity: 0 },
    { id: 8, name: 'MacBook Air M2', price: 1199.99, quantity: 0 },
    { id: 9, name: 'Camera Canon EOS R6', price: 2499.99, quantity: 0 },
    { id: 10, name: 'Nintendo Switch', price: 299.99, quantity: 0 }
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  updateProductQuantity(productId: number, quantity: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.quantity = quantity;
    }
  }
}