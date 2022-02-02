import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;
  distrito : any;
  ciudad: any;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      //Aquí vienen las declaraciones que teníamos
      pasatiempos: this.formBuilder.array([])
    })

  }

  // Si algún valor falla lo marca en rojo
  guardar(formGrupo: FormGroup) {
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
    this.forma.setValue
      ({
        nombre: "Juan Carlos",
        apellido: "Valiño",
        email: "abcde@gmail.com",
        direccion: {
          distrito: "1A",
          ciudad: "Badajoz"
        }
      })
  }

  // TODO Preguntar a Nuno pagina 8
  resetearDatosFormulario() {
    this.forma.reset({
      nombre: "sin nombre",
      apellido: "",
      email: "",
      direccion: {
        distrito: "1A",
        ciudad: "Badajoz"
      }
    });
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

}
