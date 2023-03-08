import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurveShapeComponent } from './generator/curve-shape/curve-shape.component';
import { PavementShapeComponent } from './generator/pavement-shape/pavement-shape.component';

const routes: Routes = [
  {path: '', component: PavementShapeComponent},
  {path: 'curve', component: CurveShapeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
