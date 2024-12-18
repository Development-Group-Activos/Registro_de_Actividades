import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ConsultaActividad } from '../model/consultaActividad';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EditarActividadService {
  constructor(private http: HttpClient) {}

  public buscarActividadId(actActividad: any) {
    const url: string = environment.baseUrl + `/buscarId/${actActividad}`;
    return this.http.get<ConsultaActividad>(url);
  }

  public editarActividad(editar: ConsultaActividad) {
    return this.http.put<ConsultaActividad>(
      environment.baseUrl + `/actualizarActividad`,
      editar
    );
  }
}
