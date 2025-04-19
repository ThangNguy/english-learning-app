import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
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
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public hidePassword = signal<boolean>(true);
  public hideConfirmPassword = signal<boolean>(true);
  public isSubmitting = signal<boolean>(false);

  constructor(private _fb: FormBuilder, private _router: Router) {
    this.registerForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
      age: [''],
      termsAccepted: [false, [Validators.requiredTrue]]
    }, { 
      validators: this._passwordMatchValidator 
    });

    // Add conditional validation for age field
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      const ageControl = this.registerForm.get('age');
      if (role === 'child') {
        ageControl?.setValidators([Validators.required, Validators.min(3), Validators.max(17)]);
      } else {
        ageControl?.clearValidators();
      }
      ageControl?.updateValueAndValidity();
    });
  }

  // Custom validator to check if password and confirm password match
  private _passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting.set(true);
      console.log('Registration form submitted', this.registerForm.value);
      // In a real application, you would call a registration service here
      // For demonstration, we'll just simulate an API call with setTimeout
      setTimeout(() => {
        this.isSubmitting.set(false);
        this._router.navigate(['/login']);
      }, 1500);
    } else {
      // Mark all form controls as touched to trigger validation messages
      this._markFormGroupTouched(this.registerForm);
    }
  }

  public togglePasswordVisibility(): void {
    this.hidePassword.update(current => !current);
  }

  public toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword.update(current => !current);
  }

  // Helper method to mark all controls as touched
  private _markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this._markFormGroupTouched(control);
      }
    });
  }
}
