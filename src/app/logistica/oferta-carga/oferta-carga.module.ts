import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { OfertaCargaComponent } from './components/oferta-carga.component';
import { OfertaCargaRoutingModule } from './oferta-carga-routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [OfertaCargaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OfertaCargaRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
  ],
})
export class OfertaCargaModule { }
