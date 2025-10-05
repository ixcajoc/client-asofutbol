import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TeamService } from '../../../services/team-service.service';
import { MessageService } from '../../../services/message-service.service';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-new-futbol-team',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-futbol-team.html',
  styleUrl: './new-futbol-team.css'
})
export class NewFutbolTeam {



  teamForm: FormGroup;
  coachList: any = []; // Lista de entrenadores
  userList: any = [];  // Lista de usuarios


  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,

  ) 
  {
    this.teamForm = this.fb.group({
      nombre: ['', Validators.required],
      nombre_corto: ['', Validators.required],
      logo_url: [''],
      color_principal: ['#000000', Validators.required],
      color_secundario: ['#ffffff', Validators.required],
      fecha_fundacion: ['', Validators.required],
      estadio: ['', Validators.required],
      entrenador: ['', Validators.required],
      id_usuario_responsable: ['', Validators.required]
    });
  }

  // submitTeamForm() {
  //   if (this.teamForm.valid) {
  //     console.log(this.teamForm.value);
  //     // Aquí envías los datos a tu API
  //   }
  // }

  ngOnInit(){
    this.getAllCoaches()
    this.getAllUsers()
  }

  submitTeamForm() {
    let newTeam = {
      nombre: this.teamForm.value.nombre ?? '',
      nombre_corto: this.teamForm.value.nombre_corto ?? '',
      logo_url: this.teamForm.value.logo_url ?? '',
      color_principal: this.teamForm.value.color_principal ?? '',
      color_secundario: this.teamForm.value.color_secundario ?? '',
      fecha_fundacion: this.teamForm.value.fecha_fundacion ?? '',
      estadio: this.teamForm.value.estadio ?? '',
      entrenador: this.teamForm.value.entrenador ?? '',
      id_usuario_responsable: this.teamForm.value.id_usuario_responsable ?? ''
    };

    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
      return;
    }

    console.log(newTeam);
    this.newTeam(newTeam);
  }

  newTeam(newTeam:any){
    this.teamService.newTeam(newTeam).subscribe({
      next: (response)=> {
        response;
        this.messageService.successAlert();
        this.router.navigate(['/dashboard1/panel-team']);
      },
      error: (error) => {
          console.error('Error al crear el jugador:', error);
          const errorMessage = error.error?.message || 'Error desconocido';

          // Manejo de errores de validación
          if (error.error?.errors) {
              error.error.errors.forEach((err: any) => {
                const fieldMessage = `Error en el campo ${err.path}: ${err.msg}`;
                this.messageService.errorAlert(fieldMessage);
              });
          } else {
              this.messageService.errorAlert(errorMessage);
          }
      }
    }); 
  }

  getAllCoaches(){
    this.userService.getAllCoaches('ENTRENADOR').subscribe({
        next:(response)=>{
          this.coachList = response.data;
          console.log(this.coachList);
        },
        error: (error) => (console.log(error))
      });
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe({
        next:(response)=>{
          this.userList = response.data;
          console.log(this.userList);
        },
        error: (error) => (console.log(error))
      });
  }

  ctrl(name: string) { return this.teamForm.get(name)!; }

  isInvalid(name: string): boolean {
    const c = this.ctrl(name);
    return c.invalid && (c.dirty || c.touched);
  }

  getError(name: string): string {
    const c = this.ctrl(name);
    if (c.hasError('required')) return 'Este campo es obligatorio.';
    return 'Valor inválido.';
  }

  
}


