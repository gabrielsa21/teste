import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeraLiquidacaoRoutingModule } from './gera-liquidacao-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { GeraLiquidacaoComponent } from './components/gera-liquidacao.component';

@NgModule({
  declarations: [
    GeraLiquidacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GeraLiquidacaoRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
  ],
})
export class GeraLiquidacaoModule { }
