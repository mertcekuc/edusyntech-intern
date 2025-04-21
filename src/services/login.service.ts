import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "/admins.json";
  private gh_url = 'https://mertcekuc.github.io/edusyntech-page/admins.json';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.gh_url).pipe(
      map(users => users.some(user => user.email === email && user.password === password)),
      catchError(() => 
        this.http.get<any[]>(this.url).pipe(
          map(users => users.some(user => user.email === email && user.password === password))
        )
      )
    );
  }
}
