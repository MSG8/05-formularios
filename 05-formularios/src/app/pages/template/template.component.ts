import { Component, OnInit } from '@angular/core';
import {AbstractControl, NgForm, NgModel} from "@angular/forms";
import { PaisService } from 'src/app/service/pais.service';
import {InterfacePais} from "../interfaces/pais";
import {DatosFormularioService} from "../../services/datos-formulario.service";
import {Router} from "@angular/router";

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
      fechaNacimiento: "",
      numTelefono: "",
      pais: ""
    };

  paises: InterfacePais[] = [{
    name: 'Seleccione el país',
    alpha3Code: '',
    hidden: true
  }];

  constructor(private paisService: PaisService, private datosFormulario: DatosFormularioService, private router: Router) {
    //coloco el primer elemento del array, ya no es necesario
    // this.paises.unshift({
    //   name: 'Seleccione el país',
    //   alpha3Code: ''
    // });
  }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(dato => {
        console.log(dato);
        //necesitamos hacer un for para introducir unoa uno cada pais en el paises
        for (let i = 0; i < dato.length; i++) {
          this.paises.push(dato[i])
        }
      })
  }

  //coloca el valor seleccionado
  //toma el valor del opcion selecionado
  displayFn(pais: InterfacePais): string {
    return pais && pais.name ? pais.name : '';
  }

  //buscar pais
  buscarPais(texto: string, pais: string): boolean {
    let nombre = pais.toLowerCase();
    //si algun pais cuenta con los caracteres buscados su ngIF es true
    if (nombre.indexOf(texto.toLowerCase()) >= 0) {
      return true
    } else {
      return false
    }
    return true
  }

  guardar(forma: NgForm) {
    if (this.datosFormulario.tomarDatos(forma.form)) {
      this.router.navigate(['/verTemp']);
    }
    //tocolo que se ha puesto el foco sobre los input si lo ha hecho
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
  }
}
