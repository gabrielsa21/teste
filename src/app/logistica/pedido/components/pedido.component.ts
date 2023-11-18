import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.sass'],
  providers: [ToastrService],
})
export class PedidoComponent implements OnInit {
  
  constructor() {

  }

  ngOnInit(): void {
    
  }
}
