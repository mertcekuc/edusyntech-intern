import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = '/subscriptions.json';
  private http = inject(HttpClient);

  filterSubscriptions(
    status?: string,
    from?: Date,
    to?: Date,
    plan?: string,
    offer?: string,
    show_latest: boolean = false
  ): Observable<Subscription[]> {
    console.log('Fetching subscriptions...');
  
    return this.http.get<Subscription[]>(this.apiUrl).pipe(
      map(subscriptions => {
        // Step 1: Apply filters
        let filteredSubscriptions = subscriptions.filter(sub => {
          return (!status || sub.subscriptionStatus === status) &&
                 (!from || new Date(sub.endDate) >= from) &&
                 (!to || new Date(sub.startDate) < to) &&
                 (!plan || sub.plan === plan) &&
                 (!offer || sub.offer === offer);
        });
  
        // Step 2: If show_latest is true, return only the latest subscription per user
        if (show_latest) {
          const latestSubscriptions = Object.values(
            filteredSubscriptions.reduce((acc, sub) => {
              if (
                !acc[sub.userId] || 
                new Date(sub.endDate).getTime() > new Date(acc[sub.userId].endDate).getTime()
              ) {
                acc[sub.userId] = sub;
              }
              return acc;
            }, {} as Record<string, Subscription>) // Object to store latest subscription per user
          );
  
          return latestSubscriptions;
        }
  
        return filteredSubscriptions;
      })
    );
  }
  
}
