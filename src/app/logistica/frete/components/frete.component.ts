import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'frete',
  templateUrl: './frete.component.html',
  styleUrls: ['./frete.component.sass'],
  providers: [ToastrService],
})
export class FreteComponent implements OnInit {
  
  constructor() {

  }

  ngOnInit(): void {
    
  }
}
