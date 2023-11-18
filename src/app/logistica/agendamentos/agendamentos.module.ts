import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendamentoRoutingModule } from './agendamentos-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AgendamentoComponent } from './components/agendamentos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AgendamentoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgendamentoRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastrService 
  ]
})
export class AgendamentoModule { }
