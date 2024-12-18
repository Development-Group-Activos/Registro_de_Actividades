import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Actividad } from '../model/actividad';
import { DescripcionDominio } from '../model/descripcionDominio';
import { UsuarioSesion } from '../model/usuarioSesion';
import { Radicacion } from '../model/radicacion';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  constructor(private http: HttpClient) {}

  public getOperacion(): Observable<DescripcionDominio[]> {
    const url: string = environment.baseUrl + `/operacion/`;
    return this.http.get<DescripcionDominio[]>(url);
  }

  public getSesion(usuario: string): Observable<UsuarioSesion> {
    const url: string = environment.baseUrl + `/buscarSesion/${usuario}`;
    return this.http.get<UsuarioSesion>(url);
  }

  public getDepFuncional(): Observable<any[]> {
    const url: string = environment.baseUrl + `/listadoDependenciaFuncional/`;
    return this.http.get<any[]>(url);
  }

  public getProyecto(): Observable<Radicacion[]> {
    const url: string = environment.baseUrl + `/radicacion/`;
    return this.http.get<Radicacion[]>(url);
  }

  public crearActividad(crear: Actividad) {
    return this.http.post<Actividad>(environment.baseUrl + `/crear`, crear);
  }

  public buscarActividad(fecha: string, cedula: number) {
    const url: string =
      environment.baseUrl + `/buscar?eplNd=${cedula}&actFecha=${fecha}`;
    return this.http.get<Actividad[]>(url);
  }

  public eliminarActividad(actSecuencia: number) {
    const url: string =
      environment.baseUrl + `/eliminarActividad/${actSecuencia}`;
    return this.http.delete(url);
  }
}
