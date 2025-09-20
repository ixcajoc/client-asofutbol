import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  constructor() {}


  successAlert(){
    Swal.fire({
      icon: "success",
      title: "Excelente!",
      text: "Todo bien",
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
  errorAlert(text:string){
    Swal.fire({
      icon: "error",
      title: "Oopss...",
      text: `${text}`,
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }



}
