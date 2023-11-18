import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        path: 'frete',
        loadChildren: () =>
          import('./logistica/frete/frete.module').then(
            (m) => m.FreteModule
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
        path: 'gera-liquidacao',
        loadChildren: () =>
          import('./logistica/gera-liquidacao/gera-liquidacao.module').then(
            (m) => m.GeraLiquidacaoModule
          ),
      },
      {
        path: 'componentes-para-uso/advance-table',
        loadChildren: () =>
          import('./componentes-para-uso/advance-table/advance-table.module').then(
            (m) => m.AdvanceTableModule
          ),
      },
      {
        path: 'componentes-para-uso/data-tables',
        loadChildren: () =>
          import('./componentes-para-uso/data-tables/data-tables.module').then((m) => m.DataTablesModule),
      },
      {
        path: 'componentes-para-uso/tables',
        loadChildren: () =>
          import('./componentes-para-uso/tables/tables.module').then((m) => m.TablesModule),
      },
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
