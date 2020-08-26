import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../servicios/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(private servicioPais: PaisService) { }

  ngOnInit(): void {
    this.servicioPais.getPaises().subscribe(paises => {
      console.log(paises);
    })
  }

}
