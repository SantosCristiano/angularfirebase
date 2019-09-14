import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { Reclamo } from '../modelo/reclamo';
import { request } from 'https';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {
  reclamoList: AngularFireList<any>;
  selectedReclamo: Reclamo = new Reclamo();

  constructor(private angularFireDataBase:AngularFireDatabase) { 

  }

  //operacion que retorna todos los reclamos que tengo disponible
  getReclamos() {
    return this.reclamoList = this.angularFireDataBase.list('reclamo');

  }
  //operacion agregar reclamo
  agregarReclamo(reclamo: Reclamo) {
    this.reclamoList.push({
      titulo: request.titulo,
      texto: request.texto,
      locacion: request.locacion
    })
  }
  //operacion actualizacion de reclamo
  actualizaReclamo(reclamo: Reclamo) {
    this.reclamoList.update(request.$key, {
      titulo: request.titulo,
      texto: request.texto,
      locacion: request.locacion
    })
  }
  //eliminarReclamo
  eliminarReclamo(identificador: any) {
    this.reclamoList.remove(identificador);

  }
}
