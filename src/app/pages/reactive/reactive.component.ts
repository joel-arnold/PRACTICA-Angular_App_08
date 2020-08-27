import { Component, OnInit } from '@angular/core';
import { ValidadoresService } from '../../servicios/validadores.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private constructorFormulario: FormBuilder,
    private validador: ValidadoresService
  ) {
    this.inicializarFormulario();
    this.cargarFormulario();
    this.crearOyentes()
  }

  ngOnInit(): void {}

  get nombreNoValido() {
    return (
      this.formulario.get('nombre').invalid &&
      this.formulario.get('nombre').touched
    );
  }

  get apellidoNoValido() {
    return (
      this.formulario.get('apellido').invalid &&
      this.formulario.get('apellido').touched
    );
  }

  get correoNoValido() {
    return (
      this.formulario.get('correo').invalid &&
      this.formulario.get('correo').touched
    );
  }

  get usuarioNoValido() {
    return (
      this.formulario.get('usuario').invalid &&
      this.formulario.get('usuario').touched
    );
  }

  get contra1Valida() {
    return (
      this.formulario.get('contrasena1').invalid &&
      this.formulario.get('contrasena1').touched
    );
  }

  get contra2Valida() {
    const contra1 = this.formulario.get('contrasena1').value;
    const contra2 = this.formulario.get('contrasena2').value;

    return (contra1 === contra2) ? false : true
  }

  get provinciaNoValida() {
    return (
      this.formulario.get('direccion.provincia').invalid &&
      this.formulario.get('direccion.provincia').touched
    );
  }

  get ciudadNoValida() {
    return (
      this.formulario.get('direccion.ciudad').invalid &&
      this.formulario.get('direccion.ciudad').touched
    );
  }

  get pasatiempos() {
    return this.formulario.get('pasatiempos') as FormArray;
  }

  inicializarFormulario() {
    this.formulario = this.constructorFormulario.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, this.validador.noArnold]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      usuario: ['', Validators.required , this.validador.existeUsuario],
      contrasena1: ['', Validators.required],
      contrasena2: ['', Validators.required],
      direccion: this.constructorFormulario.group({
        provincia: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.constructorFormulario.array([]),
    },{
      validators: this.validador.coincidenContrasenas('contrasena1', 'contrasena2')
    });
  }

  crearOyentes(){
    // this.formulario.valueChanges.subscribe(valores => console.log(valores))
    // this.formulario.statusChanges.subscribe(estados => console.log(estados))
    this.formulario.get('nombre').valueChanges.subscribe(nombre => console.log(nombre))
  }

  // * Este lo podría usar para cargar el formulario con valores por defecto.
  // * NOTA: con el .reset puedo poner los atributos que quiera. Con el .setValue
  // * tengo que incluir todos los atributos, aunque los ponga en blanco ('').
  cargarFormulario() {
    this.formulario.setValue({
      nombre: 'Jeremias',
      apellido: 'Springfield',
      correo: 'joelarnold@hotmail.com.ar',
      usuario: '',
      contrasena1: '123',
      contrasena2: '123',
      direccion: {
        provincia: 'Santa Fe',
        ciudad: 'Rosario',
      },
      pasatiempos: [],
    });
    ['Comer', 'Dormir'].forEach((item) =>
      this.pasatiempos.push(this.constructorFormulario.control(item))
    );
  }

  agregarPasatiempo() {
    this.pasatiempos.push(
      this.constructorFormulario.control('Nuevo elemento', Validators.required)
    );
  }

  borrarPasatiempo(indice: number) {
    this.pasatiempos.removeAt(indice);
  }

  guardar() {
    if (this.formulario.valid) {
      console.log('El formulario es valido');
      console.log(this.formulario.value);
    }

    if (this.formulario.pending) {
      console.log('El formulario se está validando en este preciso momento');
    }

    if (this.formulario.invalid) {
      console.log('Formulario no valido');
      return Object.values(this.formulario.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
