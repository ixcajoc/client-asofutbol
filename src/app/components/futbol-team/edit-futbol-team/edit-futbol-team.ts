import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeamService } from '../../../services/team-service.service';
import { MessageService } from '../../../services/message-service.service';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-edit-futbol-team',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-futbol-team.html',
  styleUrl: './edit-futbol-team.css'
})
export class EditFutbolTeam {

  route: ActivatedRoute = inject(ActivatedRoute);
  teamForm: FormGroup;
  coachList: any = []; // Lista de entrenadores
  userList: any = [];  // Lista de usuarios
  teamData: any = {};


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

  ngOnInit(){
    this.getAllCoaches()
    this.getAllUsers()
    this.getTeamById()
  }

  getTeamById() {
    const teamId = this.route.snapshot.params['teamId'];

    this.teamService.getTeamByid(teamId).subscribe({
      next: (response)=> {
        console.log(response.data)
        this.teamData = response.data;

        const fechaCompleta = this.teamData.fecha_fundacion;
        const fechaFormateada = fechaCompleta.split("T")[0];

        this.teamForm.patchValue({
          nombre: this.teamData.nombre,
          nombre_corto: this.teamData.nombre_corto,
          // logo_url: this.teamData.logo_url,
          color_principal: this.teamData.color_principal,
          color_secundario: this.teamData.color_secundario,
          // fecha_fundacion: this.teamData.fecha_fundacion,
          fecha_fundacion: fechaFormateada, // <-- si necesitas formatear la fecha
          estadio: this.teamData.estadio,
          entrenador: this.teamData.entrenador,
          id_usuario_responsable: this.teamData.id_usuario_responsable
        });

      },
      error: (error) => {console.log(error)}
    });
  }


  updateTeam(){
    let editedTeam = {
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

    console.log(editedTeam);

    this.teamService.updateTeam(this.teamData.id_equipo, editedTeam).subscribe({
      next: (response)=> {
        // alert(`Felicidades: ${response}`)
        this.messageService.successAlert()
        this.router.navigate(['/dashboard1/panel-team']);
      },
      error: (error) => {
        // alert(`Algo salio mal: ${error}`);
        this.messageService.errorAlert(error)
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

}
