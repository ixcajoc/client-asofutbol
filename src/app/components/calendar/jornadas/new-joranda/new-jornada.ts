
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { JornadaService } from '../../../../services/jornada-service.service';
import { SeasonService } from '../../../../services/season-service.service';


@Component({
  selector: 'app-new-jornada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-jornada.html'
})
export class NewJornada {
  private fb = inject(FormBuilder);
  private jornadasService = inject(JornadaService);
  private seasonService = inject(SeasonService);
  private router = inject(Router);
  
  ngOnInit(){
    this.getSeasons();
  }

  jornadaForm: FormGroup = this.fb.group(
    {
      id_temporada: [null, [Validators.required, Validators.min(1)]],
      numero_jornada: [null, [Validators.required, Validators.min(1)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      fecha_inicio: ['', [Validators.required]],         // ISO 8601
      fecha_fin: ['', [Validators.required]],            // ISO 8601
      completada: [false, [Validators.required]],
      descripcion: ['', [Validators.maxLength(500)]],
    },
    { validators: [this.fechaRangoValidator] }
  );

  // Validador de rango de fechas a nivel de FormGroup
  private fechaRangoValidator(group: AbstractControl): ValidationErrors | null {
    const inicio = group.get('fecha_inicio')?.value;
    const fin = group.get('fecha_fin')?.value;
    if (!inicio || !fin) return null;
    const i = new Date(inicio).getTime();
    const f = new Date(fin).getTime();
    return f > i ? null : { rangoFechasInvalido: true };
  }

  ctrl(name: string) { return this.jornadaForm.get(name)!; }

  isInvalid(name: string): boolean {
    const c = this.ctrl(name);
    return c.invalid && (c.dirty || c.touched);
  }

  getError(name: string): string {
    const c = this.ctrl(name);
    if (c.hasError('required')) return 'Este campo es obligatorio.';
    if (c.hasError('min')) return 'El valor debe ser mayor o igual a 1.';
    if (c.hasError('maxlength')) return 'Se superó el máximo de caracteres.';
    return 'Valor inválido.';
  }

  submitJornadaForm() {
    if (this.jornadaForm.invalid) {
      this.jornadaForm.markAllAsTouched();
      return;
    }

    // Validación de rango a nivel formulario
    if (this.jornadaForm.hasError('rangoFechasInvalido')) {
      // Puedes mostrar un toast/alert aquí si usas un MessageService
      return;
    }

    const payload: any = {
      id_temporada: Number(this.ctrl('id_temporada').value),
      numero_jornada: Number(this.ctrl('numero_jornada').value),
      nombre: this.ctrl('nombre').value,
      fecha_inicio: this.ctrl('fecha_inicio').value, // Enviar como ISO 8601
      fecha_fin: this.ctrl('fecha_fin').value,       // Enviar como ISO 8601
      completada: !!this.ctrl('completada').value,
      descripcion: this.ctrl('descripcion').value || ''
    };

    this.jornadasService.newJornada(payload).subscribe({
      next: () => this.router.navigate(['/dashboard1/calendar/jornada']),
      error: (error) => {
        const msg = error?.error?.message || 'Error al crear la jornada';
        console.error(msg, error);
        // Si tu backend envía errors[] estilo express-validator:
        if (error?.error?.errors) {
          error.error.errors.forEach((e: any) => console.warn(`Error en ${e.path}: ${e.msg}`));
        }
      }
    });
  }

  seasonList: any = []
  getSeasons(){
    this.seasonService.getAllSeasons().subscribe({
      next:(response) => {
        this.seasonList = response.data;
      },
      error:(error) =>{
        console.log(error)
      }
    });


  }
}