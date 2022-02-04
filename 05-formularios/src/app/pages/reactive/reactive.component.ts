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

  constructor(private formBuilder: FormBuilder, private validaciones:ValidadoresService,private datosFormulario:DatosFormularioService,private router:Router) {
    this.crearFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5),this.validaciones.noApellido] ],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/")]],
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


}
