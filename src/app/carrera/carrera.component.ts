import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { Carrera } from './models/carrera';
import { CarreraService } from './services/carrera.service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [SidebarComponent, CardModule, ButtonModule,PanelModule,TableModule,CommonModule,DialogModule,ConfirmDialogModule,InputTextModule,ToastModule,FormsModule],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {

  carreras: Carrera[]=[];
  titulo:string='';
  opc:string='';
  carrera= new Carrera();
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;


  constructor(private carreraService: CarreraService,

    private messageService: MessageService
  ) {}

  ngOnInit() {
   this.listarCarreras();

  }
  listarCarreras(){
    this.carreraService.getCarreras().subscribe((data) => {
      this.carreras = data;
  });
  }
  hola(id:number){
    console.log('button clicked '+id);
  }
  showDialogCreate() {
    this.limpiar();
    this.titulo="Crear Categoría"
    this.opc="Save";
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number) {
    this.limpiar();
    this.titulo="Editar Categoría"
    this.opc="Editar";
   this.carreraService.getCarreraById(id).subscribe((data)=>{
      this.carrera=data;
      this.op=1;
   });
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteCarrera(id: number) {
    this.isDeleteInProgress = true;
    this.carreraService.deleteCarrera(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Carrera eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarCarreras();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la categoría',
        });
      },
    });
  }
  addCarrera():void{
    this.carreraService.createCarrera(this.carrera).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrera Registrada',
        });
        this.listarCarreras();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Agregar la categoría',
        });
      },
    });
    this.visible = false;
  }
  editCarrera(){
    this.carreraService.updateCarrera(this.carrera,this.carrera.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrera Editada',
        });
        this.listarCarreras();
        console.log(this.carrera.id+' '+this.carrera.nombre+' '+this.carrera.estado);
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la categoría',
        });
      },
    });
    this.visible = false;
  }
  opcion():void{
    if(this.op==0){
      this.addCarrera();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editCarrera();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }

  }
 limpiar(){
  this.titulo='';
  this.opc='';
  this.op = 0;
  this.carrera.id=0;
  this.carrera.nombre='';
  this.carrera.estado='A';
 }

}
