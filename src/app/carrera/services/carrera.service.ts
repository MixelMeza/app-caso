import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrera } from '../models/carrera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private apiUrl = 'http://localhost:8080/api/carreras';
  constructor(private http: HttpClient) { }


  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }

  getCarreraById(id:number):Observable<Carrera>{
    return this.http.get<Carrera>(`${this.apiUrl}/${id}`);
  }

  createCarrera(Carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.apiUrl, Carrera);
  }

  deleteCarrera(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateCarrera(Carrera:Carrera, id:number): Observable<Carrera>{
    return this.http.put<Carrera>(`${this.apiUrl}/${id}`, Carrera);
  }
}
