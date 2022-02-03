import { Component, OnInit } from '@angular/core';
import {DatosFormularioService} from "../../../services/datos-formulario.service";

@Component({
  selector: 'app-reactive-res',
  templateUrl: './reactive-res.component.html',
  styleUrls: ['./reactive-res.component.css']
})
export class ReactiveResComponent implements OnInit {
  datos!:any;
  constructor(private datosFormulario:DatosFormularioService) {
    this.datos=this.datosFormulario.Datos;
    console.log(this.datos);
  }

  ngOnInit(): void {
  }

}
