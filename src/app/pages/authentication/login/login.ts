import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { MessageService } from '../../../services/message-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  loading = false;
  authError?: any;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() { this.showPassword = !this.showPassword; }

  auth() {
    if (this.loading) return;
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }

    this.loading = true;
    this.authError = undefined;
    const post = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this.authService.auth(post).subscribe({
      next: (response) => {
        this.loading = false;
        this.authService.setToken(response.data.token);
        this.messageService.successAlert();
        this.router.navigate(['/dashboard1']);
      },
      error: (error) => {
        this.loading = false;
        this.authError = error?.error?.message || 'Usuario o contraseña incorrectos.';
        this.messageService.errorAlert(this.authError);
      }
    });
  }

  ctrl(name: string) { return this.loginForm.get(name)!; }
  isInvalid(name: string): boolean {
    const c = this.ctrl(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
  getError(name: string): string {
    const c = this.ctrl(name);
    if (!c) return 'Campo inválido.';
    if (c.hasError('required')) return name === 'username' ? 'El usuario es obligatorio.' : 'La clave es obligatoria.';
    if (c.hasError('minlength')) {
      const min = c.errors?.['minlength']?.requiredLength;
      return name === 'username' ? `El usuario debe tener al menos ${min} caracteres.` : `La clave debe tener al menos ${min} caracteres.`;
    }
    return 'Valor inválido.';
  }
}