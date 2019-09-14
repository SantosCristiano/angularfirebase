import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ReclamosService } from '../servicios/reclamos.service';
import { Reclamo } from '../modelo/reclamo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';


@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.less']
})
export class ReclamosComponent implements OnInit {
  reclamoLista: Reclamo[];

  constructor(private reclamoService: ReclamosService, private toastrManager: ToastsManager, vcr: ViewContainerRef) {
    toastrManager.setRootViewContainerRef(vcr);
    //this.toastrManager.success("eperacion exitosa", "ejemplo firebase");
   }

  ngOnInit() {
    this.obtenerInformacion();
  }

  obtenerInformacion() {
    console.log("Metodo obtenerInfomacion");

    var contenido = this.reclamoService.getReclamos();

    contenido.snapshotChanges().subscribe( item => {
      this.reclamoLista = [];

      item.forEach( elemento => {
        var registro = elemento.payload.toJSON();
        registro["$key"] = elemento.key;

        this.reclamoLista.push(registro as Reclamo);

      });
    });
  }

  editar(item: Reclamo) {
    console.log("metodo adicion");
    this.reclamoService.selectedReclamo = Object.assign({}, item);

    console.log(JSON.stringify(this.reclamoService.selectedReclamo));
  }

  eliminar(item) {
    console.log("metodo eliminar" + JSON.stringify(item.$key));

    if (confirm('Está seguro que queres eliminar o registro') == true) {
      this.reclamoService.eliminarReclamo(item.$key);
      this.toastrManager.success("operacion de eliminacion exitosa", "ejemplo firebase");
    } 
  }

  agregar(item) {
    console.log("metodo agregar");
  }

  onSubmit(reclamoForm: NgForm) {
    console.log('metodo onSubmit ' + JSON.stringify(reclamoForm.value));

    if (this.reclamoService.selectedReclamo.$key = null) {
      this.reclamoService.agregarReclamo(reclamoForm.value);
      this.toastrManager.success("operacion de alta exitosa", "ejemplo firebase");
    } else {
      this.reclamoService.actualizaReclamo(reclamoForm.value);
      this.toastrManager.success("operacion de alta exitosa", "ejemplo firebase");
    }
  }

  resetForm(reclamoForm: NgForm) {
    console.log('metodo resetForm');
    if (reclamoForm != null) {
      reclamoForm.reset();
      this.reclamoService.selectedReclamo = {
        $key: null,
        titulo: '',
        texto: '',
        locacion: ''
      }
    }

  }

}
