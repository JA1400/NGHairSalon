import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthService } from './services/authservice.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../assets/adminSiteStyles.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  actionMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    this.loginService
      .login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.authService.setLocalStorage(response);
          this.router.navigate(['/admin/info']);
        },

        error: (error) => {
          this.actionMessage = error.error.message;
        },
      });
  }
}
