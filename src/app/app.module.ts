import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PavementShapeComponent } from './generator/pavement-shape/pavement-shape.component';
import { CurveShapeComponent } from './generator/curve-shape/curve-shape.component';

@NgModule({
  declarations: [
    AppComponent,
    PavementShapeComponent,
    CurveShapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
