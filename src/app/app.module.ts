import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoginComponent } from './registro/actividades/login/login.component';
import { RegistroComponent } from './registro/actividades/registro/registro.component';
import {InputMaskModule} from 'primeng/inputmask';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {TooltipModule} from 'primeng/tooltip';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    InputTextareaModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    InputMaskModule,
    CardModule,
    DropdownModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
    InputNumberModule,
    TooltipModule,
    DividerModule,
    FieldsetModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
