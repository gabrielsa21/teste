import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhePedidoClienteComponent } from './components/detalhe-pedido-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: DetalhePedidoClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhePedidoClienteRoutingModule {}
