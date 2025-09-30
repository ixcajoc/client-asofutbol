import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-home',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './nav-home.html',
  styleUrl: './nav-home.css'
})
export class NavHome {

    scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
