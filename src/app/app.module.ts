import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActividadComponent } from './actividad/actividad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarActividadComponent } from './editar-actividad/editar-actividad.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import {KnobModule} from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [AppComponent, ActividadComponent, EditarActividadComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    KnobModule,
    FormsModule,
    TooltipModule,
    BadgeModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
