import { Component } from '@angular/core';
import { SeasonService } from '../../../services/season-service.service';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {

  statList: any = []

  constructor(
    private seasonservice: SeasonService,
  )
  {}

  ngOnInit(){
    this.getAllStats();

  }

  getAllStats(){
    this.seasonservice.getAllStats().subscribe({
      next:(response)=>{
        this.statList = response.data;
        // console.log(this.statList);
      },
      error: (error) => (console.log(error))
    });
  }

  

}
