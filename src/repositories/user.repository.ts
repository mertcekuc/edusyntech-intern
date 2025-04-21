import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  private userRepository = inject(UserService);

  getUserById(Id: string): Observable<User> {
    return this.userRepository.getUserById(Id) as Observable<User>;
  }

  getUsersByStatus(status: string): Observable<User[]> {
    return this.userRepository.getUsersByStatus(status) as Observable<User[]>;
  }
}
