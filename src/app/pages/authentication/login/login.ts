import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule, 
    
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['', Validators.required],
    }); 

   }

  auth(){
    let post = {
      username: this.loginForm.value.username??'',
      password: this.loginForm.value.password??'',
      
    }
    console.log(post)
    this.authService.auth(post);

  }

  

}
