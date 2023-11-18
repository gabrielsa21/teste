import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidoComponent } from './components/pedido.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { PedidoRoutingModule } from './pedido-routing.module';

@NgModule({
  declarations: [PedidoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PedidoRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
  ],
})
export class PedidoModule {}
