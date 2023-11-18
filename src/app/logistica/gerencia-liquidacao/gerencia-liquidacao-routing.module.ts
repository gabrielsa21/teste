import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciaLiquidacaoComponent } from './components/gerencia-liquidacao.component';

const routes: Routes = [
  {
    path: '',
    component: GerenciaLiquidacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciaLiquidacaoRoutingModule {}
