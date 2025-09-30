import { Component } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { Sidebar } from '../../../shared/sidebar/sidebar';
import { RouterModule } from '@angular/router';
import { PanelDashboard } from "../panel-dashboard/panel-dashboard";

@Component({
  selector: 'app-dashboard1',
  imports: [
    Navbar,
    Sidebar,
    RouterModule,
    PanelDashboard
    
],
  templateUrl: './dashboard1.html',
  styleUrl: './dashboard1.css'
})
export class Dashboard1 {

}
