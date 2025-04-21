import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [FormsModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedQuery : string | null = null;
  userId? : string;
  selectedSubStatus? : "active" | "inactive" | null = null;
  sub_status?: "active" | "expried" | "canceled" | "never_subscribed"|null = null;
  sub_plan?: "mothly" | "3_months" | "6_months" | "12_months"|null = null;
  sub_offer?:  "free_trial" | "discounted" | "standard"|null = null;
  sub_from?: Date;
  sub_to?: Date;
  show_latest?: boolean;

  constructor(private router: Router) {}

  getUser(){
    this.router.navigate(['home/user'], {queryParams:{id:this.userId}});
  }

  getUsersByStatus(){
    this.router.navigate(['home/user'],{queryParams:{status:this.selectedSubStatus}} );
  }

  filterSubscriptions()
  {
    console.log(this.sub_status, this.sub_from, this.sub_to, this.sub_plan, this.sub_offer);
    this.router.navigate(['home/subscription'], {queryParams:{status:this.sub_status, from:this.sub_from, to:this.sub_to, plan:this.sub_plan, offer:this.sub_offer, show_latest:this.show_latest}});
  }
}
