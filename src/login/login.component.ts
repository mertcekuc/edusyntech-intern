import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  showPassword: boolean = false;
  message: string = "";
  wrongPassword: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(isValid => {
      if (isValid) {
        // Navigate to a different route after successful login
        this.router.navigate(['/home']);
      } else {
        this.wrongPassword = true;
      }
    });
  }
}
