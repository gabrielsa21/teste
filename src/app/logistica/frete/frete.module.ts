import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreteComponent } from './components/frete.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { FreteRoutingModule } from './frete-routing.module';

@NgModule({
  declarations: [FreteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FreteRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
  ],
})
export class FreteModule {}
