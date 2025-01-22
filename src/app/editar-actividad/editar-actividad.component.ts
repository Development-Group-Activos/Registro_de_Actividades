import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { ActividadComponent } from '../actividad/actividad.component';
import { ActividadService } from '../actividad/actividad.service';
import { Actividad } from '../model/actividad';
import { ConsultaActividad } from '../model/consultaActividad';
import { DependenciaFuncional } from '../model/dependenciaFuncional';
import { DescripcionDominio } from '../model/descripcionDominio';
import { Radicacion } from '../model/radicacion';
import { EditarActividadService } from './editar-actividad.service';
import { NotiflixService } from 'src/app/shared/notiflix-service/notiflix.service';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css'],
})
export class EditarActividadComponent implements OnInit {
  pipe = new DatePipe('en-US');
  fecha: any = null;
  actividad: Actividad[] = [];
  operacion: DescripcionDominio[] = [];
  dependencia: DependenciaFuncional[] = [];
  radicacion: Radicacion[] = [];
  consulta!: ConsultaActividad;
  secuencia: any;
  usuario: any = localStorage.getItem('usuarioSesion');

  formEditar: FormGroup;

  constructor(
    private _notiflixService: NotiflixService,
    private actividadService: ActividadService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: ActividadService,
    private editarService: EditarActividadService
  ) {
    this.formEditar = this.formBuilder.group({
      actActividad: [null],
      actDescripcion: [null],
      actTiempo: [null],
      radicacion: [null],
      actDependencia: [null],
      actSecuencia: [null],
      eplNd: [null],
    });
  }

  ngOnInit(): void {
    this._notiflixService.loadingStart('Cargando datos...');
    this.actividadService.getOperacion().subscribe((response: any) => {
      this.operacion = response;
    });

    this.actividadService.getDepFuncional().subscribe((response: any) => {
      this.dependencia = response;
    });

    this.actividadService.getProyecto().subscribe((response: any) => {
      this.radicacion = response;
    });

    this.route.params.subscribe((paramMap) => {
      this.secuencia = paramMap['actSecuencia'];
      this.buscarActividad(this.secuencia);
    });

  }

  buscarActividad(codigo: any) {
    this.editarService.buscarActividadId(this.secuencia).subscribe((response) => {
      this.consulta = response;
      this.consulta.actSecuencia = this.secuencia;
      this.formEditar.patchValue(this.consulta);
    });
    this._notiflixService.loadingClose(3000);
  }
  

  public editarActividad() {
    this._notiflixService.loadingStart('Actualizando datos...');
    this.formEditar.value.actSecuencia = this.secuencia;
    this.editarService
      .editarActividad(this.formEditar.value)
      .subscribe((response: any) => {
        Report.success(
          'Actualización',
          'La actividad fue actualizada correctamente,',
          'Aceptar'
        );
      });
      this._notiflixService.loadingClose(3000);
  }

  public volver(){
    localStorage.removeItem('usuarioSesion');
  }
}
