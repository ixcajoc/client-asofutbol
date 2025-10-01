import { Component } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { Sidebar } from '../../../shared/sidebar/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard1',
  imports: [
    Navbar,
    Sidebar,
    RouterModule,
    
],
  templateUrl: './dashboard1.html',
  styleUrl: './dashboard1.css'
})
export class Dashboard1 {

}
