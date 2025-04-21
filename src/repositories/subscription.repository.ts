import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';
import { SubscriptionService } from '../services/subscription.service';
import {Convert} from "easy-currencies"

@Injectable({
  providedIn: 'root'
})
export class SubscriptionRepository {
    private subscriptionService = inject(SubscriptionService);

    async filterSubscriptions(status?: string, from?: Date, to?: Date, plan?: string, offer?: string, show_latest?:boolean): Promise<Subscription[]> {
        let subscriptions = await firstValueFrom(this.subscriptionService.filterSubscriptions(status, from, to, plan, offer, show_latest));
        for (let subscription of subscriptions) {
          subscription.priceInUsd = parseFloat((await Convert(subscription.price).from(subscription.currency).to('USD')).toFixed(2));
          subscription.monthlyPriceInUsd = parseFloat((await Convert(subscription.monthlyPrice).from(subscription.currency).to('USD')).toFixed(2));
        }
        return subscriptions;
    }
}
