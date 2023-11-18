import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeraLiquidacaoComponent } from './components/gera-liquidacao.component';

const routes: Routes = [
  {
    path: '',
    component: GeraLiquidacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeraLiquidacaoRoutingModule {}
