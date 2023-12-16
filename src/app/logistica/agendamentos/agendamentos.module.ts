import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendamentoRoutingModule } from './agendamentos-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AgendamentoComponent } from './components/agendamentos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatDatepickerModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    MatNativeDateModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    ToastrService 
  ]
})
export class AgendamentoModule { }
