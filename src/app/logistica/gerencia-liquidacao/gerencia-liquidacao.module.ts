import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GerenciaLiquidacaoRoutingModule } from './gerencia-liquidacao-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { GerenciaLiquidacaoComponent } from './components/gerencia-liquidacao.component';

@NgModule({
  declarations: [GerenciaLiquidacaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GerenciaLiquidacaoRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
  ],
})
export class GerenciaLiquidacaoModule { }
