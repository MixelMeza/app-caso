import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
   private apiUrl= 'http://localhost:8080/api/alumnos';
  constructor(private http:HttpClient) { }


  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getAlumnoById(id:number):Observable<Alumno>{
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  createAlumno(Alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, Alumno);
  }

  deleteAlumno(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateAlumno(Alumno:Alumno, id:number): Observable<Alumno>{
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, Alumno);
  }

}
