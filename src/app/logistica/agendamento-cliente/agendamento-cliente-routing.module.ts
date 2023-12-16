import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoClienteComponent } from './components/agendamento-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoClienteRoutingModule {}
