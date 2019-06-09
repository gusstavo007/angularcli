import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes : Ajustes ={
    temaUrl : 'assets/css/colors/default.css',
    tema: 'default'
  }


  constructor(  @Inject(DOCUMENT) private _document, ) {
    this.CargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes) );
  }
  CargarAjustes(){

    if(localStorage.getItem('ajustes')){

      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

      console.log('Cargando de localstorage');

      this.aplicarTema(this.ajustes.tema);
    }else{
      console.log('Usando Valores por defecto');
      this.aplicarTema(this.ajustes.tema);
    }

  }

  aplicarTema ( tema: string){
    let url = `assets/css/colors/${tema}.css`;

    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();

  }

}

interface Ajustes {
  temaUrl  :string ,
  tema: string;
}
