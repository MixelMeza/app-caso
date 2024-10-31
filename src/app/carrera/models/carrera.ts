export class Carrera {
  id:number;
  nombre:string;
  estado:string;
  constructor(id:number=0,nombre:string='',estado:string=''){
    this.id=id;
    this.nombre=nombre;
    this.estado=estado;
  }
}
