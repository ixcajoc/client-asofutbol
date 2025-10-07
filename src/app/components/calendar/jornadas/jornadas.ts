import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JornadaService } from '../../../services/jornada-service.service';

@Component({
  selector: 'app-jornadas',
  imports: [RouterModule, CommonModule],
  templateUrl: './jornadas.html',
  styleUrl: './jornadas.css'
})
export class Jornadas {

  constructor(
    private jornadaService:JornadaService
  ){}

  ngOnInit(){
    this.getAllJorandas();
  }

  jornadaList: any = []
  getAllJorandas(){
    this.jornadaService.getAllJornadas().subscribe({
      next:(repsonse) =>{
        this.jornadaList = repsonse.data;
      },
      error: (error)=>{
        console.log(error)
      }
    });
  }

}
