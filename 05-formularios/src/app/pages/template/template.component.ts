import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { PaisService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: "",
    apellido: "",
    correo: ""
  }
  
  constructor(private paisService : PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        console.log(paises);
      })
  }

  guardar(forma: NgForm) {
    console.log(forma)
    console.log(forma.value)
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
  }

  
}
