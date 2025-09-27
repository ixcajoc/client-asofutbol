import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../services/event-service.service';
import { MessageService } from '../../../services/message-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlayerService } from '../../../services/player-service.service';

@Component({
  selector: 'app-new-event',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-event.html',
  styleUrl: './new-event.css'
})
export class NewEventComponent {


  
  // @Input() eventData: any;
  // @Output() close = new EventEmitter<void>();
  route: ActivatedRoute = inject(ActivatedRoute);


  playerList: any = []
  fieldEventId: number = 0;

  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private message: MessageService,
    private playerService: PlayerService
  ) {
    this.eventForm = this.fb.group({
      id_partido: ['', Validators.required],
      id_jugador: ['', Validators.required],
      tipo_evento: ['', Validators.required],
      minuto: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      descripcion: ['', [Validators.maxLength(500)]],
      id_jugador_asistencia: ['']
    });
  }

  ngOnInit(): void {
    this.getAllPlayers()
    this.fieldEventId  = this.eventForm.value.id_partido ?? '';
  }
  // closeModal(): void {
  //   this.close.emit();
  // }

  submitEventForm() {
    let newEvent = {
      id_partido: this.eventForm.value.id_partido ?? '',
      id_jugador: this.eventForm.value.id_jugador ?? '',
      tipo_evento: this.eventForm.value.tipo_evento ?? '',
      minuto: this.eventForm.value.minuto ?? '',
      descripcion: this.eventForm.value.descripcion ?? '',
      id_jugador_asistencia: this.eventForm.value.id_jugador_asistencia ?? ''
    };

    console.log(newEvent);
    this.eventService.newEvent(newEvent);
  }


  getAllPlayers() {

    this.playerService.getAllPlayers().subscribe({
      next: (response)=> {
        // console.log(response.data)
        this.playerList = response.data;

      },
      error: (error) => {console.log(error)}
    });
  }
}
