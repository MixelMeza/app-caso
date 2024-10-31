import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Alumno } from './models/alumno';
import { AlumnoService } from './services/alumno.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Carrera } from '../carrera/models/carrera';
import { CarreraService } from '../carrera/services/carrera.service';
import { RouterTestingHarness } from '@angular/router/testing';
@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [SidebarComponent, CardModule, ButtonModule, PanelModule, TableModule, CommonModule,DialogModule,ConfirmDialogModule,InputTextModule,ToastModule,FormsModule,CalendarModule,DropdownModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent implements OnInit {
  alumnos:Alumno[]=[];
  titulo:string='';
  opc:string='';
  carreras:Carrera[]=[];
  carreraSelectionada:string='';
  alumno = new Alumno();
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

   constructor(
     private alumnoService: AlumnoService,
     private messageService: MessageService,
     private carreraService: CarreraService
   )
   {}

   ngOnInit():void{
     this.listarAlumnos();
     this.listarCarreras();

   }

   listarCarreras(){
    this.carreraService.getCarreras().subscribe((data) => {
      this.carreras = data;
  });
}

   listarAlumnos(){
     this.alumnoService.getAlumnos().subscribe((data)=>{
       this.alumnos=data;
     });
   }
   hola(id:number){
     console.log('button clicked '+id);
   }
   showDialogCreate() {
    this.limpiar();
     this.titulo="Crear Alumno"
     this.opc="Save";
     this.op=0;
     this.visible = true; // Cambia la visibilidad del diálogo
   }
   showDialogEdit(id:number) {
     this.limpiar();
     this.titulo="Editar Categoría"
     this.opc="Editar";
    this.alumnoService.getAlumnoById(id).subscribe((data)=>{
      console.log(data)
       this.alumno=data;
       this.op=1;
       if (this.alumno.fecha_nac && typeof this.alumno.fecha_nac === 'string') {
        this.alumno.fecha_nac = new Date(this.alumno.fecha_nac);
      }
    });

     this.visible = true; // Cambia la visibilidad del diálogo
   }
   deleteAlumno(id: number) {
     this.isDeleteInProgress = true;
     this.alumnoService.deleteAlumno(id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'error',
           summary: 'Correcto',
           detail: 'Alumno eliminado',
         });
         this.isDeleteInProgress = false;
         this.listarAlumnos();
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



   removeTimeFromDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

   addAlumno():void{
    if (this.alumno.fecha_nac instanceof Date) {
      this.alumno.fecha_nac = this.removeTimeFromDate(this.alumno.fecha_nac);
    }
  console.log("Datos a enviar:", this.alumno);
     this.alumnoService.createAlumno(this.alumno).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'Alumno Registrada',
         });
         this.listarAlumnos();
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
   editAlumno(){
    if (this.alumno.fecha_nac instanceof Date) {
      this.alumno.fecha_nac = this.removeTimeFromDate(this.alumno.fecha_nac);
    }
     this.alumnoService.updateAlumno(this.alumno,this.alumno.id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'Alumno Editada',
         });
         this.listarAlumnos();
         console.log(this.alumno.id+' '+this.alumno.nombres+' '+this.alumno.apellidos);
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
       this.addAlumno();
       this.limpiar();
     }else if(this.op==1){
       console.log("Editar");
       this.editAlumno();
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
   this.alumno.id=0;
   this.alumno.nombres='';
   this.alumno.apellidos='';
   this.alumno.fecha_nac=null;
   this.alumno.carrera = undefined;
   this.alumno.correo='';
  }

}
