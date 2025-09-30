import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerService } from '../../../services/player-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamService } from '../../../services/team-service.service';
import { MessageService } from '../../../services/message-service.service';
import { CommonModule } from '@angular/common';
import { Banner } from '../../../shared/banner/banner';

@Component({
  selector: 'app-edit-futbol-player',
  imports: [
    FormsModule,
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    CommonModule,
    Banner
  ],
  templateUrl: './edit-futbol-player.html',
  styleUrl: './edit-futbol-player.css'
})
export class EditFutbolPlayer {

  route: ActivatedRoute = inject(ActivatedRoute);
  playerData: any = {}
  teamList: any = []

  playerPositionList: any[] = [
  'PORTERO',
  'DEFENSA',
  'MEDIOCAMPISTA',
  'DELANTERO',
  ];

  playerForm: FormGroup;

  constructor(
    private playerService: PlayerService, 
    private fb: FormBuilder,
    private teamService: TeamService,
    private messageService: MessageService,
    private router: Router,

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
    this.getPlayerById()
  }

  getAllTeams(){
    this.teamService.getAllTeams().subscribe({
      next:(response)=>{
        this.teamList = response;
        console.log(this.teamList);
      },
      error: (error) => (console.log(error))
    });
  }

  getPlayerById() {
    const playerId = this.route.snapshot.params['playerId'];

    this.playerService.getPlayerById(playerId).subscribe({
      next: (response)=> {
        console.log(response.data)
        this.playerData = response.data;

        const fechaCompleta = this.playerData.fecha_nacimiento;
        const fechaFormateada = fechaCompleta.split("T")[0]; // Extrae '1995-02-14'

        this.playerForm.patchValue({
          id_equipo: this.playerData.id_equipo,
          numero_camiseta: this.playerData.numero_camiseta,
          nombre: this.playerData.nombre,
          apellido: this.playerData.apellido,
          // fecha_nacimiento: this.playerData.fecha_nacimiento,
          fecha_nacimiento: fechaFormateada,
          posicion: this.playerData.posicion,
          peso: this.playerData.peso,
          altura: this.playerData.altura,
          pie_habil: this.playerData.pie_habil,
          nacionalidad: this.playerData.nacionalidad,
          documento_identidad: this.playerData.documento_identidad,
          telefono: this.playerData.telefono, // Opcional
          email: this.playerData.email
        });

        // console.log(this.itemBasura)
      },
      error: (error) => {console.log(error)}
    });
  }


  updatePlayer(){
    let editedPlayer = {
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

    console.log(editedPlayer);

    this.playerService.updatePlayer(this.playerData.id_jugador, editedPlayer).subscribe({
      next: (response)=> {
        // alert(`Felicidades: ${response}`)
        this.messageService.successAlert()
        this.router.navigate(['/dashboard1/player-panel']);
      },
      error: (error) => {
        // alert(`Algo salio mal: ${error}`);
        this.messageService.errorAlert(error)
      }
    });
    
  }

}
