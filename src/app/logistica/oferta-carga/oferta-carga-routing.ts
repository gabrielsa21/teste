import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfertaCargaComponent } from './components/oferta-carga.component';

const routes: Routes = [
  {
    path: '',
    component: OfertaCargaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaCargaRoutingModule {}
