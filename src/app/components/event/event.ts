import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event-service.service';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EditEvent } from "./edit-event/edit-event";
import { NewEventComponent } from './new-event/new-event';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Banner } from '../../shared/banner/banner';

@Component({
  selector: 'app-event',
  imports: [
    CommonModule,
    NewEventComponent,
    RouterModule,
    Banner,

],
  templateUrl: './event.html',
  styleUrl: './event.css'
})
export class EventComponent {
  
    constructor(
      private eventService: EventService,
      private router: Router,

    ) {}
  
    ngOnInit():void{
      this.getAllEvents();
      this.getMatchEvents()
    }
  
    private url = environment.url;
    route: ActivatedRoute = inject(ActivatedRoute);

    eventsList: any = []
    eventGameList: any =[]
    matchEventId: Number= 0;
  
    getAllEvents(){
      this.eventService.getAllEvents().subscribe({
        next:(response)=>{
          this.eventsList = response.data;
        },
        error: (error) => (console.log(error))
      });
  
  
    }

    getMatchEvents() {
    const matchEventId = this.route.snapshot.params['matchEventId'];

    this.eventService.getEventsByMatch(matchEventId).subscribe({
      next: (response)=> {
        this.eventGameList = response.data;


        console.log(this.eventGameList)
      },
      error: (error) => {console.log(error)}
    });
   }





    formatDate(date: any) {
      let d = new Date(date);
  
      let dia = d.getDate().toString().padStart(2, '0');
      let mes = (d.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
      let anio = d.getFullYear();
  
      return `${dia}-${mes}-${anio}`;
    }
  
    confirmarEliminar(eventId:number) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta accion.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEvent(eventId);
          // this.getAllGames()
        }
      });
    }
      
    deleteEvent(eventId:number){
      this.eventService.deleteEvent(eventId).subscribe({
        next: (response) => {
          console.log(response)
        
          Swal.fire({
            title: "¡Eliminado!",
            text: "Item eliminado.",
            icon: "success"
          });
  
          this.eventsList = this.eventsList.filter(
            (event:any) => event.id_evento !== eventId
          );
  
        },
        error: (error) => {
          console.error('Error al eliminar el jugador:', error);
          const errorMessage = error.error?.message || 'Error desconocido';
          Swal.fire({
            title: "Algo salió mal",
            text: `Error: ${errorMessage}`,
            icon: "error"
          });
        }
      });
    }

    // updateEvent(id_evento:number){
    //   alert(`editado ${id_evento}`)
    // }

   
    

}
