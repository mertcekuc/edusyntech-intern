import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private gh_url = 'https://mertcekuc.github.io/edusyntech-page/users.json';
  private apiUrl = '/users.json';
  private http = inject(HttpClient);

  getUserById(id: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.gh_url).pipe(
      map(users => users.find(user => user.id === id)),
      catchError(() => {
        return this.http.get<User[]>(this.apiUrl).pipe(
          map(users => users.find(user => user.id === id))
        );
      })
    );
  }

  getUsersByStatus(status: string): Observable<User[]> {
    return this.http.get<User[]>(this.gh_url).pipe(
      map(users => users.filter(user => user.subscriptionStatus === status)),
      catchError(() => {
        return this.http.get<User[]>(this.apiUrl).pipe(
          map(users => users.filter(user => user.subscriptionStatus === status))
        );
      })
    );
  }
}
