import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateResComponent } from './pages/ver/template-res/template-res.component';
import { ReactiveResComponent } from './pages/ver/reactive-res/reactive-res.component';

const routes: Routes = [
  { path: 'template', component:TemplateComponent},
  { path: 'reactive', component:ReactiveComponent},
  { path: 'verReac', component:ReactiveResComponent},
  { path: 'verTemp', component:TemplateResComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'reactive' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
