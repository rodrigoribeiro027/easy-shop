import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { Product, CartItem, PaymentData } from '../models/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
changeQty(p: Product, delta: number) {
  const newQty = (p.quantity || 0) + delta;
  p.quantity = newQty < 0 ? 0 : newQty;
}

  onQuantityChange(productId: number, quantity: number) {
    if (quantity < 0) quantity = 0;
    this.productService.updateProductQuantity(productId, quantity);
  }

  finalizePurchase() {
    // Filter products with quantity > 0
    const selectedProducts = this.products.filter(product => product.quantity && product.quantity > 0);

    if (selectedProducts.length === 0) {
      alert('Selecione pelo menos um produto para finalizar a compra!');
      return;
    }

    // Create cart items with subtotal calculation
    const cartItems: CartItem[] = selectedProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity!,
      subtotal: product.price * product.quantity!
    }));

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    // Prepare payment data
    const paymentData: PaymentData = {
      items: cartItems,
      total: total
    };

    // Navigate to payment page with data
    const navigationExtras: NavigationExtras = {
      state: paymentData
    };

    this.router.navigate(['/payment'], navigationExtras);
  }

  getTotalItems(): number {
    return this.products.reduce((total, product) => total + (product.quantity || 0), 0);
  }

  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
      if (product.quantity && product.quantity > 0) {
        return total + (product.price * product.quantity);
      }
      return total;
    }, 0);
  }
}