import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeamService } from '../../../services/team-service.service';
import { MessageService } from '../../../services/message-service.service';
import { UserService } from '../../../services/user-service.service';
import { JornadaService } from '../../../services/jornada-service.service';
import { GamesService } from '../../../services/games-service.service';

@Component({
  selector: 'app-edit-game',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.css'
})
export class EditGame {

  route: ActivatedRoute = inject(ActivatedRoute);
  matchForm: FormGroup;
  jornadaList: any = [];
  teamList: any = [];
  refereeList: any = [];
  coachList: any = [];
  gameData: any = {};

  ngOnInit(){
    this.getAllReferee();
    this.getAllJornadas();
    this.getAllTeams();
    this.getGameById();
    // this.getAllUsers()
  }

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private jornadaSevice: JornadaService,
    private gameServices: GamesService
  ) 
  {
    this.matchForm = this.fb.group({
      id_jornada: ['', Validators.required],
      id_equipo_local: ['', Validators.required],
      id_equipo_visitante: ['', Validators.required],
      fecha_partido: ['', Validators.required],
      estadio: [''],
      id_arbitro: [''],
      estado: ['PROGRAMADO'] // Valor por defecto
    });
  }


  getAllReferee(){
    this.userService.getAllCoaches('ARBITRO').subscribe({
        next:(response)=>{
          this.refereeList = response.data;
          // console.log(this.refereeList);
        },
        error: (error) => (console.log(error))
      });
  }

  getAllJornadas(){
    this.jornadaSevice.getAllJornadas().subscribe({
        next:(response)=>{
          this.jornadaList = response.data;
          // console.log(this.jornadaList);
        },
        error: (error) => (console.log(error))
      });
  }

  getAllTeams(){
    this.teamService.getAllTeams().subscribe({
        next:(response)=>{
          this.teamList = response.data;
          // console.log(this.teamList);
        },
        error: (error) => (console.log(error))
      });
  }

  getGameById() {
    const gameId = this.route.snapshot.params['gameId'];

    this.gameServices.getGameByid(gameId).subscribe({
      next: (response)=> {
        console.log(response.data)
        this.gameData = response.data;

        this.matchForm.patchValue({
          id_jornada: this.gameData.id_jornada,
          id_equipo_local: this.gameData.id_equipo_local,
          id_equipo_visitante: this.gameData.id_equipo_visitante,
          fecha_partido: `${this.formatDate(this.gameData.fecha_partido)}`,
          // fecha_partido: this.gameData.fecha_partido,
          // fecha_partido: fechaFormateada, // <-- convertir a yyyy-MM-ddTHH:mm para <input type="datetime-local">
          estadio: this.gameData.estadio,
          id_arbitro: this.gameData.id_arbitro,
          estado: this.gameData.estado
        });


      },
      error: (error) => {console.log(error)}
    });
  }


  updateGame(){
    let editedMatch = {
      id_jornada: this.matchForm.value.id_jornada ?? '',
      id_equipo_local: this.matchForm.value.id_equipo_local ?? '',
      id_equipo_visitante: this.matchForm.value.id_equipo_visitante ?? '',
      fecha_partido: this.matchForm.value.fecha_partido ?? '',
      estadio: this.matchForm.value.estadio ?? '',
      id_arbitro: this.matchForm.value.id_arbitro ?? '',
      estado: this.matchForm.value.estado ?? 'PROGRAMADO'
    };

    console.log(editedMatch);

    this.gameServices.updateGame(this.gameData.id_partido, editedMatch).subscribe({
      next: (response)=> {
        // alert(`Felicidades: ${response}`)
        this.messageService.successAlert()
        this.router.navigate(['/dashboard1/calendar/panel-calendar']);
      },
      error: (error) => {
        // alert(`Algo salio mal: ${error}`);
        this.messageService.errorAlert(error)
      }
    });
    
  }

  formatDate(date:any){
    let fecha = new Date(date);

    // 👉 Formato requerido: "YYYY-MM-DDTHH:mm"
    let fechaFormateada = fecha.toISOString().slice(0,16);

    return fechaFormateada
  // Ejemplo: "2024-04-06T21:00"
  }

}
