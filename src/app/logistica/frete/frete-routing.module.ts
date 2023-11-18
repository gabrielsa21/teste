import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreteComponent } from './components/frete.component';

const routes: Routes = [
  {
    path: '',
    component: FreteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreteRoutingModule {}
