import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: "Ernesto",
    apellido: "Apellido Apellido",
    correo: "ejemplo@gmail.com"
  }


  constructor() { }

  ngOnInit(): void {
  }

  guardar(forma: NgForm)
  {
    console.log(forma)
    console.log(forma.value)
  }
}
