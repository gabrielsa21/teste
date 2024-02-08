import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreteCalculaComponent } from './components/frete-calcula.component';

const routes: Routes = [
  {
    path: '',
    component: FreteCalculaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreteCalculaRoutingModule {}
