import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TeamService } from '../../../services/team-service.service';
import { MessageService } from '../../../services/message-service.service';
import { UserService } from '../../../services/user-service.service';
import { JornadaService } from '../../../services/jornada-service.service';
import { GamesService } from '../../../services/games-service.service';
import { Banner } from '../../../shared/banner/banner';

@Component({
  selector: 'app-new-game',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    Banner,
  ],
  templateUrl: './new-game.html',
  styleUrl: './new-game.css'
})
export class NewGame {

  matchForm: FormGroup;
  jornadaList: any = [];
  teamList: any = [];
  refereeList: any = [];
  coachList: any = [];

  ngOnInit(){
    this.getAllReferee();
    this.getAllJornadas();
    this.getAllTeams()
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

  submitMatchForm() {
    let newMatch = {
      id_jornada: this.matchForm.value.id_jornada ?? '',
      id_equipo_local: this.matchForm.value.id_equipo_local ?? '',
      id_equipo_visitante: this.matchForm.value.id_equipo_visitante ?? '',
      fecha_partido: this.matchForm.value.fecha_partido ?? '',
      estadio: this.matchForm.value.estadio ?? '',
      id_arbitro: this.matchForm.value.id_arbitro ?? '',
      estado: this.matchForm.value.estado ?? 'PROGRAMADO'
    };

    // console.log(newMatch);
    this.gameServices.newGame(newMatch);
    
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

}
