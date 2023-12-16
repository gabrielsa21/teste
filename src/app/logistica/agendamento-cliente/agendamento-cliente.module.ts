import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AgendamentoClienteRoutingModule } from "./agendamento-cliente-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgendamentoClienteComponent } from './components/agendamento-cliente.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AgendamentoClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    AgendamentoClienteRoutingModule,
    MatDatepickerModule,
    ToastrModule.forRoot(),
  ],
})
export class AgendamentoClienteModule { }