import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ValidadoresService} from "../../services/validadores.service";
import {DatosFormularioService} from "../../services/datos-formulario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;
  mostrarNivel= false;
  resultado: string = "sin nivel";

  constructor(private formBuilder: FormBuilder, private validaciones:ValidadoresService,private datosFormulario:DatosFormularioService,private router:Router) {
    this.crearFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5),this.validaciones.noApellido]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]],
      numTelefono: ['', [Validators.required, Validators.minLength(9)]],
      usuario : ['', , this.validaciones.existeUsuario],
      pass1:['', [Validators.required]],
      pass2:['', [Validators.required]],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      //Aquí vienen las declaraciones que teníamos
      pasatiempos: this.formBuilder.array([])
    }, {
      //le dice al formulario que es invalido
        validators:this.validaciones.passwordsIguales('pass1', 'pass2')
      }
    )

  }

  // Si algún valor falla lo marca en rojo
  guardar(formGrupo: FormGroup) {
    console.log(formGrupo)
    if (!formGrupo.parent)
    {
      if(this.datosFormulario.tomarDatos(formGrupo))
      {
        this.router.navigate(['/verReac']);
      }
    }
    if (formGrupo.invalid) {
      Object.values(formGrupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control);
        control.markAsTouched();
      })
      return;
    }

    this.resetearDatosFormulario();

    console.log(this.forma);
    // console.log(this.forma.value)
  }

  valido(titulo: any) {
    let input: any = this.forma.get(titulo);
    return !(input.invalid && input.touched);
  }

  cargarDatosFormulario() {
    this.forma.reset
      ({
        nombre: "Juan Carlos",
        apellido: "Valiño",
        email: "abcde@gmail.com",
        direccion: {
          distrito: "1A",
          ciudad: "Badajoz"
        }

      });

    ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor,[Validators.required, Validators.minLength(5)])));

  }

  // TODO Preguntar a Nuno pagina 8
  resetearDatosFormulario() {
    this.forma.reset({
      nombre: "sin nombre",
      direccion: {
        distrito: "1A",
        ciudad: "Badajoz"
      }
    });
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  agregarPasatiempo()
  {
    //llama al get
    this.pasatiempos.push(this.formBuilder.control('',[Validators.required, Validators.minLength(5)]));
  }

  borrarPasatiempo(index: number)
  {
    this.pasatiempos.removeAt(index);
  }

  get pass2Valido() {
    const pass1 = this.forma.get('pass1')?.value
    const pass2 = this.forma.get('pass2')?.value
    return (pass1 === pass2) ? true : false;
  }

  nivel(valor: HTMLInputElement)
  {
    console.log(valor)
    this.mostrarNivel=true;

    let nivel:number = 0;
    let nivel1 = new RegExp(/^(.*)$/); //cualquier caracter y rango
    let nivel2 = new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{3,}$/); //minimo mayusculas, y numero y 3 rango minimos
    let nivel3 = new RegExp(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/); //de 8 a mas caracteres caracteres, digito, minuscula,mayuculas y carcates expeciales

    if (valor.value.match(nivel1)) // Para el string
    {
      nivel=1;
    }

    if (valor.value.match(nivel2)) // Para el string
    {
      nivel=2;
    }

    if (valor.value.match(nivel3)) // Para el string
    {
      nivel=3;
    }

    switch (nivel)
    {
      case 1:
        this.resultado="Nivel bajo de contraseña"
        break;
      case 2:
        this.resultado="Nivel medio de contraseña"
        break;
      case 3:
        this.resultado="Nivel alto de contraseña"
        break;
      default:
        this.resultado="Nivel invalido"
        break;
    }
  }
}
