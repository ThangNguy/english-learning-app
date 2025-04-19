import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public hidePassword = signal<boolean>(true);
  public isSubmitting = signal<boolean>(false);

  constructor(private _fb: FormBuilder, private _router: Router) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting.set(true);
      console.log('Login form submitted', this.loginForm.value);
      // In a real application, you would call an authentication service here
      // For now, we'll just navigate to the home page after a short delay to simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this._router.navigate(['/']);
      }, 1000);
    } else {
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  public togglePasswordVisibility(): void {
    this.hidePassword.update(current => !current);
  }
}
