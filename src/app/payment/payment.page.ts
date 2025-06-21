import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentData, CartItem } from '../models/product.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  paymentData: PaymentData | null = null;
  items: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router) { 
    // Get data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.paymentData = navigation.extras.state as PaymentData;
      this.items = this.paymentData.items;
      this.total = this.paymentData.total;
    }
  }

  ngOnInit() {
    // If no data available, redirect to home
    if (!this.paymentData || this.items.length === 0) {
      this.router.navigate(['/home']);
    }
  }

  processPayment(method: 'CREDITO' | 'DEBITO') {
    const paymentInfo = {
      items: this.items,
      total: this.total,
      method: method
    };

    console.log('Payment processed:', paymentInfo);
    
    alert('Compra registrada!');
    
    // Return to home after payment
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}