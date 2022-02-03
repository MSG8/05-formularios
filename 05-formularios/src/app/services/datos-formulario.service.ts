import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DatosFormularioService {
//servicio encargado de almacenar los datos y confirmar que sean validos para recogerlos
  private datos: any; //datos recogidos

  constructor()
  {

  }

  tomarDatos(form: FormGroup):boolean
  {
    if (form.status==="VALID")
    {
      console.log("entro:"+form.status);
      console.log(form.value);
      this.datos=form.value;
      console.log(this.datos);
      return true
    }
    console.log("no entro:"+form.status);
    return false
  }

  get Datos() {
    return this.datos;
  }
}
