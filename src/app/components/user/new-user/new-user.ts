import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { MessageService } from '../../../services/message-service.service';

@Component({
  selector: 'app-new-user',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-user.html',
  styleUrl: './new-user.css'
})
export class NewUser {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password_hash: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      fecha_nacimiento: ['', Validators.required],
      id_rol: ['', Validators.required]
    });
  }

  // Helpers de UI
  ctrl(name: string) { return this.userForm.get(name)!; }
  isInvalid(name: string) {
    const c = this.ctrl(name);
    return c.invalid && (c.dirty || c.touched);
  }
  getError(name: string): string {
    const c = this.ctrl(name);
    if (c.hasError('required')) return 'Este campo es obligatorio.';
    if (name === 'email' && c.hasError('email')) return 'Ingrese un correo válido.';
    if (name === 'password_hash' && c.hasError('minlength')) return 'Debe tener al menos 6 caracteres.';
    return 'Valor inválido.';
  }

  submitUserForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const newUser = {
      username: this.userForm.value.username ?? '',
      email: this.userForm.value.email ?? '',
      password: this.userForm.value.password_hash ?? '',
      nombre: this.userForm.value.nombre ?? '',
      apellido: this.userForm.value.apellido ?? '',
      telefono: this.userForm.value.telefono ?? '',
      fecha_nacimiento: this.userForm.value.fecha_nacimiento ?? '',
      id_rol: this.userForm.value.id_rol ?? ''
    };

    this.newUser(newUser);
  }

  newUser(newUser: any){
    this.userService.newUser(newUser).subscribe({
      next: (response) => {
        this.userForm.reset();
        this.messageService.successAlert();
      },
      error: (error) => {
        this.messageService.errorAlert(error);
      }
    });
  }
}