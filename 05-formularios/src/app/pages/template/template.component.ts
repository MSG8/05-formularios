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
  usuario =
    {
    nombre: "",
    apellido: "",
    correo: "",
    pais:""
  };

  paises:any[]=[];

  constructor(private paisService : PaisService)
  {
    this.paises.unshift({
      name: 'Seleccione el país',
      alpha3Code: ''
    });
  }

  ngOnInit(): void
  {
    this.paisService.getPaises()
      .subscribe(dato =>
      {
        console.log(dato);
        for (let i = 0; i < dato.length; i++) {
          this.paises.push(dato[i])
        }
      })
  }

  guardar(forma: NgForm)
  {
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
