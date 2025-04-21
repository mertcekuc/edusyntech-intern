import { Injectable, signal } from '@angular/core';
import { UserRepository } from '../repositories/user.repository';
import { User,Platform } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserViewModel {
  users = signal<User[]>([]); 

  constructor(private userRepository: UserRepository) {}

  loadUser(id: string) {

    this.userRepository.getUserById(id).subscribe({
      next: (data: User) => {
        this.users.update(() => {return [data];});
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  loadUsersByStatus(status: string) {
    this.userRepository.getUsersByStatus(status).subscribe({
      next:(data : User[]) => {
        this.users.set(data);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    })
  }

  clearUsers() {
    this.users.set([]);
  }

  getPlatform(platform:number) {
    return Platform[platform];
  }
}
