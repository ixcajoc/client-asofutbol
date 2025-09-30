import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { MessageService } from '../../../services/message-service.service';

@Component({
  selector: 'app-new-user',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
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
      // password_hash: ['', [Validators.required, Validators.minLength(6)]],
      password_hash: ['', [Validators.required, Validators.required]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''], // Opcional
      fecha_nacimiento: ['', Validators.required],
      id_rol: ['', Validators.required]
    });
  }

  submitUserForm() {
    let newUser = {
      username: this.userForm.value.username ?? '',
      email: this.userForm.value.email ?? '',
      password: this.userForm.value.password_hash ?? '',
      nombre: this.userForm.value.nombre ?? '',
      apellido: this.userForm.value.apellido ?? '',
      telefono: this.userForm.value.telefono ?? '',
      fecha_nacimiento: this.userForm.value.fecha_nacimiento ?? '',
      id_rol: this.userForm.value.id_rol ?? ''
    };

    console.log(newUser);
    
    this.newUser(newUser);

    
  }

  newUser(newUser: any){
    this.userService.newUser(newUser).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente:', response);
        // Podrías resetear el formulario o redirigir
        this.userForm.reset();
        this.messageService.successAlert();
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        this.messageService.errorAlert(error)
      }
    });
  }

  // onCancel(){

  // }

}
