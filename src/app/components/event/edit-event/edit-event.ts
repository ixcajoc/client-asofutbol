import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../services/event-service.service';
import { MessageService } from '../../../services/message-service.service';
import { Banner } from '../../../shared/banner/banner';

@Component({
  selector: 'app-edit-event',
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    Banner
  ],
  templateUrl: './edit-event.html',
  styleUrl: './edit-event.css'
})
export class EditEvent {

  @Input() eventData: any = null;   // Si llega -> editar, si no -> nuevo
  @Output() close = new EventEmitter<void>();

  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private message: MessageService
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
    // Si es edición, setValor con datos ya cargados
    if (this.eventData) {
      this.eventForm.patchValue(this.eventData);
    }
  }
  closeModal(): void {
    this.close.emit();
  }

}
