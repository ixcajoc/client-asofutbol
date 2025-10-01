import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeasonService } from '../../../services/season-service.service';
import { MessageService } from '../../../services/message-service.service';

@Component({
  selector: 'app-new-season',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule
  ],
  templateUrl: './new-season.html'
})
export class NewSeason {

  seasonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private seasonService: SeasonService,
    private message: MessageService
  ) {
    this.seasonForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      año: ['', [Validators.required, Validators.min(2020), Validators.max(2050)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      descripcion: ['', [Validators.maxLength(500)]],
    });
  }

  submitSeason() {
    if (this.seasonForm.valid) {
      const newSeason = this.seasonForm.value;
      this.seasonService.newSeason(newSeason).subscribe({
        next: (response) => {
          this.message.successAlert;
          // console.log(response);
        },
        error: (error) => {
          this.message.errorAlert('Error al crear la temporada');
          console.error(error);
        }
      });
    }
  }
}