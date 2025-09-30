import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../../services/user-service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-users',
  imports: [CommonModule],
  templateUrl: './table-users.html',
  styleUrl: './table-users.css'
})
export class TableUsers {

  @Input() userData!: any;
  @Output() userDeleted = new EventEmitter<number>();

}
