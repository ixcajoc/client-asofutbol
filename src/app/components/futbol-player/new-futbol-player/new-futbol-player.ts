import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlayerService } from '../../../services/player-service.service';
import { TeamService } from '../../../services/team-service.service';

@Component({
  selector: 'app-new-futbol-player',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-futbol-player.html',
  styleUrl: './new-futbol-player.css'
})
export class NewFutbolPlayer {

  playerForm: FormGroup;

  constructor(
    private playerService: PlayerService, 
    private fb: FormBuilder,
    private teamService: TeamService
  )
    {
      this.playerForm = this.fb.group({
        id_equipo: ['', Validators.required],
        numero_camiseta: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        fecha_nacimiento: ['', Validators.required],
        posicion: ['', Validators.required],
        peso: ['', Validators.required],
        altura: ['', Validators.required],
        pie_habil: ['', Validators.required],
        nacionalidad: ['', Validators.required],
        documento_identidad: ['', Validators.required],
        telefono: [''], // Opcional
        email: ['', [Validators.required, Validators.email]]
      });
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

  teamList: any = []
  nacionalitiesList: any = []

  // playerPositionList: any[] = [
  // 'Portero',
  // 'Defensa Central',
  // 'Lateral Derecho',
  // 'Lateral Izquierdo',
  // 'Defensa Libre',
  // 'Centrocampista Defensivo',
  // 'Centrocampista Central',
  // 'Centrocampista Ofensivo',
  // 'Extremo Derecho',
  // 'Extremo Izquierdo',
  // 'Delantero Centro',
  // 'Delantero Segundo',
  // 'Delantero Extremo'
  // ];

  playerPositionList: any[] = [
  'PORTERO',
  'DEFENSA',
  'MEDIOCAMPISTA',
  'DELANTERO',
  ];

  getAllTeams(){
    this.teamService.getAllTeams().subscribe({
      next:(response)=>{
        this.teamList = response;
        console.log(this.teamList);
      },
      error: (error) => (console.log(error))
    });
  }

  submitPlayerForm() {
    let newPlayer = {
      id_equipo: this.playerForm.value.id_equipo ?? '',
      numero_camiseta: this.playerForm.value.numero_camiseta ?? '',
      nombre: this.playerForm.value.nombre ?? '',
      apellido: this.playerForm.value.apellido ?? '',
      fecha_nacimiento: this.playerForm.value.fecha_nacimiento ?? '',
      posicion: this.playerForm.value.posicion ?? '',
      peso: this.playerForm.value.peso ?? '',
      altura: this.playerForm.value.altura ?? '',
      pie_habil: this.playerForm.value.pie_habil ?? '',
      nacionalidad: this.playerForm.value.nacionalidad ?? '',
      documento_identidad: this.playerForm.value.documento_identidad ?? '',
      telefono: this.playerForm.value.telefono ?? '',
      email: this.playerForm.value.email ?? ''
    };

    console.log(newPlayer);
    this.playerService.newPlayer(newPlayer); // Ajusta este método según tu servicio
  }
  
  // submitPlayerForm() {
  //   let newPlayer = {
  //     id_equipo: this.playerForm.value.id_equipo ?? '',
  //     numero_camiseta: this.playerForm.value.numero_camiseta ?? '',
  //     nombre: this.playerForm.value.nombre ?? '',
  //     apellido: this.playerForm.value.apellido ?? '',
  //     fecha_nacimiento: this.playerForm.value.fecha_nacimiento ?? '',
  //     posicion: this.playerForm.value.posicion ?? '',
  //     peso: this.playerForm.value.peso ?? '',
  //     altura: this.playerForm.value.altura ?? '',
  //     pie_habil: this.playerForm.value.pie_habil ?? '',
  //     nacionalidad: this.playerForm.value.nacionalidad ?? '',
  //     documento_identidad: this.playerForm.value.documento_identidad ?? '',
  //     telefono: this.playerForm.value.telefono ?? '',
  //     email: this.playerForm.value.email ?? ''
  //   };

  //   console.log(newPlayer);
  // }
  

}
