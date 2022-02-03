import { Component, OnInit } from '@angular/core';
import {DatosFormularioService} from "../../../services/datos-formulario.service";

@Component({
  selector: 'app-template-res',
  templateUrl: './template-res.component.html',
  styleUrls: ['./template-res.component.css']
})
export class TemplateResComponent implements OnInit {

  datos!:any;
  constructor(private datosFormulario:DatosFormularioService) {
    this.datos=this.datosFormulario.Datos;
    console.log(this.datos);
  }

  ngOnInit(): void {
  }

}
