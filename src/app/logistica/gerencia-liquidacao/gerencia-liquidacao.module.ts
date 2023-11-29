import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GerenciaLiquidacaoRoutingModule } from './gerencia-liquidacao-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { GerenciaLiquidacaoComponent } from './components/gerencia-liquidacao.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { StatusLiqDialogComponent } from './components/status-liq-dialog/status-liq-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { NFDialogComponent } from './components/nf-dialog/nf-dialog.component';

@NgModule({
  declarations: [
    GerenciaLiquidacaoComponent,
    StatusLiqDialogComponent,
    NFDialogComponent
  ],
  exports: [
    StatusLiqDialogComponent,
    NFDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GerenciaLiquidacaoRoutingModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    NgSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class GerenciaLiquidacaoModule { }
