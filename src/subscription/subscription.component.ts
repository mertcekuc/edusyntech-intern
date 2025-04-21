import { Component, inject } from '@angular/core';
import { SubscriptionViewModel } from '../viewModels/subscription.viewmodel';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, NgClass } from '@angular/common';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  status?: "active" | "expired" | "canceled" | "never_subscribed";
  plan?: "monthly" | "3_months" | "6_months" | "12_months";
  offer?: "free_trial" | "discounted" | "standard";
  from?: Date;
  to?: Date;
  show_latest?: boolean;

  vm = inject(SubscriptionViewModel);
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.status = params.get('status') as "active" | "expired" | "canceled" | "never_subscribed";
      this.plan = params.get('plan') as "monthly" | "3_months" | "6_months" | "12_months";
      this.offer = params.get('offer') as "free_trial" | "discounted" | "standard";
      this.show_latest = params.get('show_latest') === 'true';
      const fromParam = params.get('from');
      this.from = fromParam ? new Date(fromParam) : undefined;

      const toParam = params.get('to');
      this.to = toParam ? new Date(toParam) : undefined;

      this.getSubscriptions();
    });
  }

  getSubscriptions() {
    this.vm.filterSubscriptions(this.status, this.from, this.to, this.plan, this.offer,this.show_latest);
  }

  exportToExcel() {
    let element = document.getElementById('subscriptions-table');
    if (element) {
      const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, 'subscriptions.xlsx');
    } else {
      console.error('Element with id "subscriptions-table" not found.');
    }
  }
}
