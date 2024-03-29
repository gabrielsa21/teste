import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreteComponent } from './components/frete.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { FreteRoutingModule } from './frete-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [FreteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FreteRoutingModule,
    MatInputModule,
    NgxDatatableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ]
})
export class FreteModule { }
