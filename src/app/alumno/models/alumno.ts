import { Carrera } from "../../carrera/models/carrera";

export class Alumno {
  id:number;
  codigo:string;
  nombres:string;
  apellidos:string
  fecha_nac:Date|null;
  correo:string;
  carrera?:Carrera;
  constructor(id:number= 0, codigo:string='',nombre:string='', apellido:string='',carrera?:Carrera,fechanac:Date|null= null,correo:string=''){
    this.id= id;
    this.codigo=codigo;
    this.nombres= nombre;
    this.apellidos=apellido;
    this.carrera=carrera;
    this.fecha_nac=fechanac;
    this.correo= correo;
  }
}
