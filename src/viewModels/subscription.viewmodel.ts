import { Injectable, signal, effect } from '@angular/core';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { Subscription } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionViewModel {
  subs = signal<Subscription[]>([]); 
  count = signal(0); // count'u signal olarak tanımladık.
  revenue = signal(0);
   // revenue'yi signal olarak tanımladık.
  constructor(private subscriptionRepository: SubscriptionRepository) {
    effect(() => console.log('Filtered Subscriptions:', this.subs())); 
  }

  filterSubscriptions(status?: string, from?: Date, to?: Date, plan?: string, offer?: string, show_latest?: boolean) {
    this.subscriptionRepository.filterSubscriptions(status, from, to, plan, offer, show_latest).then(subscriptions => {
      this.subs.set(subscriptions ?? []);
      this.count.set(subscriptions?.length ?? 0);
      this.calculateRevenue(from, to);
 
    });
  }

  async calculateRevenue(from?: Date, to?: Date) {
    let subscriptions = this.subs();
    let revenue = 0;
    let betweenFrom;
    let betweenTo;
    for (let subscription of subscriptions) {
      let payments = 0;
      if (from){
        if (subscription.startDate > from)
          betweenFrom = new Date(subscription.startDate);
        else
          betweenFrom = new Date(from);
      }
      else
        betweenFrom = new Date(subscription.startDate);
      
        if (to) { 
          if (subscription.cancelDate && new Date(subscription.cancelDate) < new Date(to)) {
            betweenTo = new Date(subscription.cancelDate);
          } else if (new Date(subscription.endDate) < new Date(to)) {
            betweenTo = new Date(subscription.endDate);
          } else {
            betweenTo = new Date(to);
          }
        } else {
          betweenTo = subscription.cancelDate ? new Date(subscription.cancelDate) : new Date(subscription.endDate);
        }
        
    
      let payment_period = new Date(subscription.startDate); // Ensure valid date
  
      while (payment_period < betweenTo) {
        if (
          payment_period >= betweenFrom && 
          (!subscription.cancelDate || payment_period < new Date(subscription.cancelDate)) // Allow active subscriptions
        ) {
          payments++;
        }
        payment_period = new Date(payment_period); // Clone date before modifying
        if (payment_period.getMonth() !== 11) {
          payment_period.setMonth(payment_period.getMonth() + 1);
        } else {
          payment_period.setFullYear(payment_period.getFullYear() + 1);
          payment_period.setMonth(0);
        }
      }
      
      subscription.paymentBetweenDates = parseFloat((payments*subscription.monthlyPrice).toFixed(2));
      revenue += payments * subscription.monthlyPriceInUsd;
    }
    revenue = parseFloat(revenue.toFixed(2));
    this.revenue.set(revenue);
  }
  
  
}
