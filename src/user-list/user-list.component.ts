import { Component, inject, OnInit } from '@angular/core';
import { UserViewModel } from '../viewModels/user.viewmodel';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  userSubStatus?: string | null;
  userId?: string | null;
  query?: "userById" | "usersBySubStatus";

  constructor(private route:ActivatedRoute){}
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.userId = params.get('id');
      this.userSubStatus = params.get('status');

      if (this.userId) {
        this.getUser();
      } 
      else if (this.userSubStatus) {
        this.getUsersByStatus();
      }
    });

}
  vm = inject(UserViewModel);

  getUser() {
    if (this.userId) {
      this.vm.loadUser(this.userId);
      this.query="userById";
    }
  }

  getUsersByStatus() {
    if (this.userSubStatus){
      this.vm.loadUsersByStatus(this.userSubStatus);
      this.query="usersBySubStatus";
    }
  }

  exportToExcel() {
    let element = document.getElementById('users-table');
    if (element) {
      const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, 'users.xlsx');
    } else {
      console.error('Element with id "users-table" not found.');
    }
  }
}