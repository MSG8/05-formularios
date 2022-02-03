import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activo: boolean = true;

  activarModal(){
    this.activo = true;
  }

  quitarModal(){
    this.activo = false;
  }

  
}
