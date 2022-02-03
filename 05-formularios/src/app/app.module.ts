import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { FormsModule } from "@angular/forms"; //para que el formulario no se envie por defecto
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from './components/shared/shared.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
//////////////////////////////PARTE MANUEL//////////////////////////////////////
import { NavComponent } from './pages/shared/nav/nav.component';
import { TemplateResComponent } from './pages/ver/template-res/template-res.component';
import { ReactiveResComponent } from './pages/ver/reactive-res/reactive-res.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent,
    ModalComponent,
    DatePickerComponent,
    NavComponent,
    TemplateResComponent,
    ReactiveResComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
