import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { PaisService } from 'src/app/service/pais.service';
import {InterfacePais} from "../interfaces/pais";

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

  paises:InterfacePais[]=[{
    name: 'Seleccione el país',
    alpha3Code: '',
    hidden:true
  }];

  constructor(private paisService : PaisService)
  {
    //coloco el primer elemento del array, ya no es necesario
    // this.paises.unshift({
    //   name: 'Seleccione el país',
    //   alpha3Code: ''
    // });
  }

  ngOnInit(): void
  {
    this.paisService.getPaises()
      .subscribe(dato =>
      {
        console.log(dato);
        //necesitamos hacer un for para introducir unoa uno cada pais en el paises
        for (let i = 0; i < dato.length; i++) {
          this.paises.push(dato[i])
        }
      })
  }

  guardar(forma: NgForm)
  {
    //tocolo que se ha puesto el foco sobre los input si lo ha hecho
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
  }


}
