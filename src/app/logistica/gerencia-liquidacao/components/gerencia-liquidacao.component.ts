import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerencia-liquidacao',
  templateUrl: './gerencia-liquidacao.component.html',
  styleUrls: ['./gerencia-liquidacao.component.sass'],
  providers: [ToastrService],
})
export class GerenciaLiquidacaoComponent implements OnInit {
  
  constructor() {

  }

  ngOnInit(): void {
    
  }
}
