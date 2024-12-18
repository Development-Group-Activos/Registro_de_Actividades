import { Component, OnInit } from '@angular/core';
import { Actividad } from '../model/actividad';
import { DependenciaFuncional } from '../model/dependenciaFuncional';
import { DescripcionDominio } from '../model/descripcionDominio';
import { Radicacion } from '../model/radicacion';
import { ActividadService } from './actividad.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaActividad } from '../model/consultaActividad';
import { DatePipe, NgFor } from '@angular/common';
import { Notify } from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { ActivatedRoute } from '@angular/router';
import { UsuarioSesion } from '../model/usuarioSesion';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
})
export class ActividadComponent implements OnInit {
  pipe = new DatePipe('en-US');
  fecha: any = null;
  actividad: Actividad[] = [];
  operacion: DescripcionDominio[] = [];
  dependencia: DependenciaFuncional[] = [];
  radicacion: Radicacion[] = [];
  reporte: ConsultaActividad[] = [];
  usuarioSesion: UsuarioSesion | undefined;
  formCrear: FormGroup;
  usuario: string = '';
  usuarioBusqueda: any = '';
  tiempoTotal: any;
  tiempoFinal: any;
  valor = 0;
  concatenado: Radicacion[] = [];
  fechaActual = new Date();
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1;
  anio= this.fechaActual.getFullYear();
  fechaFinal: any;

  constructor(
    private actividadService: ActividadService,
    private formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute
  ) {
    this.formCrear = this.formBuilder.group({
      tdcTdEpl: [null],
      eplNd: [null],
      actFecha: [null],
      actActividad: [null],
      actDescripcion: [null],
      actTiempo: [null],
      actUsuario: [null],
      actFGraba: [null],
      radicacion: [null],
      actDependencia: [null],
      actProyecto: 'S',
      actTipo: 'E',
      valor: 0,
    });
  }

  ngOnInit(): void {

    this.fechaFinal = this.dia  +  this.mes  +  this.anio;
    /* this.formCrear.value.actFecha = this.fechaFinal */;

    this.usuario = this.rutaActiva.snapshot.params['ussIdSesion'];
    this.actividadService.getSesion(this.usuario).subscribe((response) => {
      this.usuarioSesion = response;
      localStorage.setItem('usuarioSesion', this.usuario);
    });

    this.actividadService.getOperacion().subscribe((response: any) => {
      this.operacion = response;
    });

    this.actividadService.getDepFuncional().subscribe((response: any) => {
      this.dependencia = response;
    });

    this.actividadService.getProyecto().subscribe((response: Radicacion[]) => {
      this.radicacion = response;

      this.radicacion.map((element) => {
        element.concatenar =
          element.radicacion.toString() + ' - ' + element.descripcion;
        return this.concatenado.push(element);
      });
    });
  }

  public crearActividad() {
    this.fecha = this.pipe.transform(
      this.formCrear.get('actFecha')?.value,
      'dd/MM/yyyy'
    );

    if (this.formCrear.value.actFecha === null) {
      Notify.failure('La fecha es obligatoria');
    }

    if (this.formCrear.value.actActividad === null) {
      Notify.failure('Seleccione la operacion');
    }

    if (this.formCrear.value.actDependencia === null) {
      Notify.failure('Seleccione la dependencia funcional');
    }

    if (this.formCrear.value.radicacion === null) {
      Notify.failure('Seleccione el proyecto');
    }

    if (this.formCrear.value.actDescripcion === null) {
      Notify.failure('Haga una breve descripción de la actividad realizada');
    }

    if (this.formCrear.value.actTiempo === null) {
      Notify.failure('Indique cuanto tiempo le dedicó a la actividad');
    }

    this.formCrear.value.actFecha = this.fecha;
    this.formCrear.value.tdcTdEpl = this.usuarioSesion?.tdcTdEpl;
    this.formCrear.value.eplNd = this.usuarioSesion?.eplNd;
    this.formCrear.value.actUsuario = this.usuarioSesion?.usuUsuario;
    this.formCrear.value;
    this.actividadService
      .crearActividad(this.formCrear.value)
      .subscribe((response: any) => {
        this.buscarActividad();
      });
  }

  public buscarActividad() {
    this.usuarioBusqueda = this.usuarioSesion?.eplNd;
    this.fecha = this.pipe.transform(
      this.formCrear.get('actFecha')?.value,
      'dd/MM/yyyy'
    );

    if (this.fecha === null) {
      Notify.failure('La fecha es obligatoria');
    }

    this.actividadService
      .buscarActividad(this.fecha, this.usuarioBusqueda)
      .subscribe((response: any) => {
        this.reporte = response;
        this.valor = 0;
        if (this.reporte != null) {
          this.tiempoTotal = this.reporte.forEach((x) => {
            this.valor = x.actTiempo + this.valor;
            this.formCrear.value.valor = this.valor;
          });
        }

        if (this.reporte === null) {
          Notify.info('No hay actividades registradas en la fecha ingresada');
        }
      });
  }

  public eliminarActividad(actSecuencia: number) {
    this.actividadService
      .eliminarActividad(actSecuencia)
      .subscribe((response: any) => {
        Report.failure(
          'Eliminación',
          'La actividad fue eliminada correctamene',
          'Aceptar'
        );
        this.buscarActividad();
      });
  }

  public irEditarActividad(actSecuencia: number) {}
}
