import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhePedidoClienteModule } from './logistica/detalhe-pedido-cliente/detalhe-pedido-cliente.module';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import('./logistica/agendamentos/agendamentos.module').then(
            (m) => m.AgendamentoModule
          ),
      },
      {
        path: 'agendamentos-clientes',
        loadChildren: () =>
          import('./logistica/agendamento-cliente/agendamento-cliente.module').then(
            (m) => m.AgendamentoClienteModule
          ),
      },
      {
        path: 'detalhes-pedidos-clientes',
        loadChildren: () => 
          import('./logistica/detalhe-pedido-cliente/detalhe-pedido-cliente.module').then(
            (m) => DetalhePedidoClienteModule
          )
      },
      {
        path: 'frete',
        loadChildren: () =>
          import('./logistica/frete/frete.module').then(
            (m) => m.FreteModule
          ),
      },
      {
        path: 'frete-calcula',
        loadChildren: () =>
          import('./logistica/frete-calcula/frete-calcula.module').then(
            (m) => m.FreteCalculaModule
          ),
      },
      {
        path: 'pedido',
        loadChildren: () =>
          import('./logistica/pedido/pedido.module').then(
            (m) => m.PedidoModule
          ),
      },
      {
        path: 'gerencia-liquidacao',
        loadChildren: () =>
          import('./logistica/gerencia-liquidacao/gerencia-liquidacao.module').then(
            (m) => m.GerenciaLiquidacaoModule
          ),
      },
      {
        path: 'realizacao-oferta-carga/:id',
        loadChildren: () =>
          import('./logistica/oferta-carga/oferta-carga.module').then(
            (m) => m.OfertaCargaModule
          ),
      },
      {
        path: 'gera-liquidacao',
        loadChildren: () =>
          import('./logistica/gera-liquidacao/gera-liquidacao.module').then(
            (m) => m.GeraLiquidacaoModule
          ),
      }
    ]
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
