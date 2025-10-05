import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TeamService } from '../../../services/team-service.service';
import { MessageService } from '../../../services/message-service.service';
import { UserService } from '../../../services/user-service.service';
import { JornadaService } from '../../../services/jornada-service.service';
import { GamesService } from '../../../services/games-service.service';
import { Banner } from '../../../shared/banner/banner';
import { SeasonService } from '../../../services/season-service.service';

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
  jornadaList: any[] = []; // lista completa de jornadas
  filteredJornadas: any[] = []; // jornadas filtradas por temporada
  teamList: any[] = [];
  refereeList: any[] = [];
  seasonList: any[] = [];


  selectedSeason: any | null = null;
  seasonMinDateTime: string | null = null; // formato 'YYYY-MM-DDTHH:mm'
  seasonMaxDateTime: string | null = null;

  ngOnInit() {
    this.getAllSeasons();
    this.getAllJornadas();
    this.getAllTeams();
    this.getAllReferee();
  }

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private jornadaSevice: JornadaService,
    private gameServices: GamesService,
    private seasonService: SeasonService
  ) {
    this.matchForm = this.fb.group({
      id_temporada: ['', Validators.required],
      id_jornada: ['', Validators.required],
      id_equipo_local: ['', Validators.required],
      id_equipo_visitante: ['', Validators.required],
      fecha_partido: ['', Validators.required],
      estadio: [''],
      id_arbitro: [''],
      estado: ['PROGRAMADO']
    }, {
      validators: [
        this.equiposDistintosValidator,
        this.fechaDentroDeTemporadaValidator.bind(this)
      ]
    });


    //Escuchar cambios de id_temporada:
    this.matchForm.get('id_temporada')!.valueChanges.subscribe((seasonId) => {
      this.applyJornadaFilter(seasonId);
      this.applySeasonInfo(seasonId); // ← calcular mensaje y min/max
    });
  }

  submitMatchForm() {
    if (this.matchForm.invalid) {
      this.matchForm.markAllAsTouched();
      
      // Mostrar errores de validación a nivel de formulario
      if (this.matchForm.hasError('mismosEquipos')) {
        this.messageService.errorAlert('El equipo local y visitante no pueden ser el mismo.');
      }
      if (this.matchForm.hasError('fechaFueraDeTemporada')) {
        this.messageService.errorAlert('La fecha del partido debe estar dentro del rango de la temporada seleccionada.');
      }
      return;
    }

    let newMatch = {
      id_jornada: this.matchForm.value.id_jornada ?? '',
      id_equipo_local: this.matchForm.value.id_equipo_local ?? '',
      id_equipo_visitante: this.matchForm.value.id_equipo_visitante ?? '',
      fecha_partido: this.matchForm.value.fecha_partido ?? '',
      estadio: this.matchForm.value.estadio ?? '',
      id_arbitro: this.matchForm.value.id_arbitro ?? '',
      estado: this.matchForm.value.estado ?? 'PROGRAMADO'
    };

    this.gameServices.newGame(newMatch);
  }

  // Llamar también tras cargar temporadas por si seleccionas la activa automáticamente:
  getAllSeasons() {
    this.seasonService.getAllSeasons().subscribe({
      next: (response) => {
        this.seasonList = response.data || [];
        const activa = this.seasonList.find(s => s.activa);
        if (activa) {
          this.matchForm.patchValue({ id_temporada: activa.id_temporada });
          this.applyJornadaFilter(activa.id_temporada);
          this.applySeasonInfo(activa.id_temporada);
        }
      },
      error: (error) => console.error('Error al cargar temporadas:', error)
    });
  }

  getAllJornadas() {
    this.jornadaSevice.getAllJornadas().subscribe({
      next: (response) => {
        this.jornadaList = response.data || [];
        
        // Si ya hay temporada seleccionada, aplicar filtro
        const currentSeasonId = this.matchForm.value.id_temporada;
        if (currentSeasonId) {
          this.applyJornadaFilter(currentSeasonId);
        }
      },
      error: (error) => console.error('Error al cargar jornadas:', error)
    });
  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe({
      next: (response) => {
        this.teamList = response.data || [];
      },
      error: (error) => console.error('Error al cargar equipos:', error)
    });
  }

  getAllReferee() {
    this.userService.getAllCoaches('ARBITRO').subscribe({
      next: (response) => {
        this.refereeList = response.data || [];
      },
      error: (error) => console.error('Error al cargar árbitros:', error)
    });
  }

  // Filtrar jornadas por temporada
  applyJornadaFilter(seasonId: number | string) {
    const jornadaControl = this.matchForm.get('id_jornada')!;
    
    if (!seasonId) {
      this.filteredJornadas = [];
      jornadaControl.setValue('');
      jornadaControl.disable(); // Deshabilitar si no hay temporada
      return;
    }

    const sId = Number(seasonId);
    this.filteredJornadas = this.jornadaList
      .filter(j => Number(j.id_temporada) === sId)
      .sort((a, b) => a.numero_jornada - b.numero_jornada);

    // Resetear jornada
    jornadaControl.setValue('');
    
    // Habilitar/deshabilitar según si hay jornadas disponibles
    if (this.filteredJornadas.length > 0) {
      jornadaControl.enable();
    } else {
      jornadaControl.disable();
    }
  }

  // Nueva función para seleccionar temporada y min/max del datetime
  applySeasonInfo(seasonId: number | string) {
    if (!seasonId) {
      this.selectedSeason = null;
      this.seasonMinDateTime = null;
      this.seasonMaxDateTime = null;
      // opcional: limpiar fecha si queda fuera de rango
      return;
    }
    const sId = Number(seasonId);
    const season = this.seasonList.find(s => Number(s.id_temporada) === sId);
    this.selectedSeason = season || null;

    if (season) {
      // Convertir a 'YYYY-MM-DDTHH:mm' en zona local
      const toLocalInput = (iso: string) => {
        const d = new Date(iso);
        const pad = (n: number) => String(n).padStart(2, '0');
        const yyyy = d.getFullYear();
        const mm = pad(d.getMonth() + 1);
        const dd = pad(d.getDate());
        const hh = pad(d.getHours());
        const mi = pad(d.getMinutes());
        return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
      };

      this.seasonMinDateTime = toLocalInput(season.fecha_inicio);
      // Para max, si quieres permitir todo el día final, puedes usar 23:59
      const fin = new Date(season.fecha_fin);
      const maxLocal = new Date(fin);
      // Opción A: usar la hora exacta de fecha_fin
      this.seasonMaxDateTime = toLocalInput(maxLocal.toISOString());
      // Opción B (alternativa): fin del día
      // maxLocal.setHours(23, 59, 0, 0);
      // this.seasonMaxDateTime = toLocalInput(maxLocal.toISOString());

      // Ajuste: si la fecha seleccionada ya no cae dentro del nuevo rango, límpiala
      const fechaCtrl = this.matchForm.get('fecha_partido')!;
      const val = fechaCtrl.value;
      if (val) {
        const current = new Date(val).getTime();
        const min = new Date(season.fecha_inicio).getTime();
        const max = new Date(season.fecha_fin).getTime();
        if (current < min || current > max) {
          fechaCtrl.setValue('');
        }
      }
    } else {
      this.seasonMinDateTime = null;
      this.seasonMaxDateTime = null;
    }
  }

  // Validador: equipos distintos
  equiposDistintosValidator(group: AbstractControl): ValidationErrors | null {
    const local = group.get('id_equipo_local')?.value;
    const visitante = group.get('id_equipo_visitante')?.value;
    
    if (!local || !visitante) return null;
    
    return String(local) === String(visitante) 
      ? { mismosEquipos: true } 
      : null;
  }

  // Validador: fecha dentro de temporada
  fechaDentroDeTemporadaValidator(group: AbstractControl): ValidationErrors | null {
    const seasonId = Number(group.get('id_temporada')?.value);
    const fecha = group.get('fecha_partido')?.value;
    
    if (!seasonId || !fecha) return null;
    
    const season = this.seasonList.find(s => Number(s.id_temporada) === seasonId);
    if (!season) return null;
    
    const f = new Date(fecha).getTime();
    const ini = new Date(season.fecha_inicio).getTime();
    const fin = new Date(season.fecha_fin).getTime();
    
    return f < ini || f > fin 
      ? { fechaFueraDeTemporada: true } 
      : null;
  }

  // Helpers de estado
  ctrl(name: string) { 
    return this.matchForm.get(name)!; 
  }

  isInvalid(name: string): boolean {
    const c = this.ctrl(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  getError(name: string): string {
    const c = this.ctrl(name);
    if (!c) return 'Campo inválido.';
    if (c.hasError('required')) return 'Este campo es obligatorio.';
    return 'Valor inválido.';
  }
}