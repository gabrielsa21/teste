import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { AgendamentoService } from 'src/app/core/service/agendamento/agendamento.service';


@Component({
  selector: 'agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})

export class AgendamentoComponent implements OnInit {

  rows: any;
  temp: string[] = [];
  form!: FormGroup;
  loadingIndicator = false;
  scrollBarHorizontal = window.innerWidth < 1200;

  @ViewChild('table') table!: DatatableComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AgendamentoService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.scrollBarHorizontal = window.innerWidth < 1200;
    this.table.recalculate();
    this.table.recalculateColumns();
  }

  ngOnInit(): void {
    this._initForm();
    this.ObtemPedidos();
  }

  private _initForm() {
    this.form = this.fb.group({
      dataInicial: [null],
      dataFinal: [null],
      cidade: [null],
      cliente: [null]
    });
  }

  ObtemPedidos() {
    this.loadingIndicator = true;
    const dataInicial = this.form.get("dataInicial")?.value;
    const dataFinal = this.form.get("dataFinal")?.value;
    const cidade = this.form.get("cidade")?.value;
    const cliente = this.form.get("cliente")?.value;

    this.service.obtemPedidosParaAgendamento(
      dataInicial ? moment(dataInicial).format("YYYY/MM/DD").replaceAll('/', "") : '@',
      dataFinal ? moment(dataFinal).format("YYYY/MM/DD").replaceAll('/', "") : '@',
      cidade ? cidade : '@',
      cliente ? cliente : '@'
    ).subscribe(res => {
      console.log('res', res);
      this.loadingIndicator = false;
      this.rows = res;
      this.temp = [...res];
    }, error => {
      this.loadingIndicator = false;
      console.error(error);
    });
  };

  goToCliente(row: any) {
    localStorage.setItem("nomecliente", row.razaosocial);
    localStorage.setItem("codcli", row.codcli);
    this.router.navigate(['/agendamentos-clientes']);
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      return d.razaosocial.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }
}
