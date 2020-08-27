import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface validadorError {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  
    existeUsuario(control: FormControl): Promise<validadorError> | Observable<validadorError>{
      if(!control.value){
        return Promise.resolve(null)
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'jarnold') {
            resolve({existe: true})
          } else {
            resolve(null)
          }
        }, 3500);
      })
    }

  noArnold(control: FormControl): validadorError {
    if(control.value.toLowerCase() === 'arnold'){
      return { noArnold: true }
    }

    return null
  }

  coincidenContrasenas(contra1Nombre: string, contra2Nombre: string){
    return (formulario: FormGroup) => {
      const controlContra1 = formulario.controls[contra1Nombre]
      const controlContra2 = formulario.controls[contra2Nombre]
      if(controlContra1.value === controlContra2.value){
        controlContra2.setErrors(null)
      } else {
        controlContra2.setErrors({ noEsIgual: true })
      }
    }
  }
}
