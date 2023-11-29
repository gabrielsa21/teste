import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { GerenciaLiquidacaoService } from 'src/app/core/service/gerencia-liquidacao/gerencia-liquidacao.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StatusLiqDialogComponent } from './status-liq-dialog/status-liq-dialog.component';
import { NFDialogComponent } from './nf-dialog/nf-dialog.component';

@Component({
  selector: 'app-gerencia-liquidacao',
  templateUrl: './gerencia-liquidacao.component.html',
  styleUrls: ['./gerencia-liquidacao.component.scss'],
})
export class GerenciaLiquidacaoComponent implements OnInit {
  rows: any;
  temp: string[] = [];
  loadingIndicator = false;
  reorderable = true;
  scrollBarHorizontal = window.innerWidth < 1200;
  empresa = '2';

  form!: FormGroup;

  dataSelect = [];

  @ViewChild('table') table!: DatatableComponent;

  constructor(
    private service: GerenciaLiquidacaoService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dialog2: MatDialog
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.scrollBarHorizontal = window.innerWidth < 1200;
    this.table.recalculate();
    this.table.recalculateColumns();
  }

  ngOnInit(): void {
    this.initForm();
    this.getStatusLiquidation();
    this.getStatusCompany();
  }

  initForm() {
    const isForm: any = localStorage.getItem("formulario-gerencia-liquidacao");
    const form = JSON.parse(isForm);

    this.form = this.fb.group({
      dataInicial: [form.dataInicial ? form.dataInicial : null, Validators.required],
      dataFinal: [form.dataFinal ? form.dataFinal : null, Validators.required],
      dataAGInicial: [form.dataAGInicial ? form.dataAGInicial : null],
      dataAGFinal: [form.dataAGFinal ? form.dataAGFinal : null],
      dataCARInicial: [form.dataCARInicial ? form.dataCARInicial : null],
      dataCARFinal: [form.dataCARFinal ? form.dataCARFinal : null],
      option: ['3'],
      situacao: [[]]
    });

    if (form) this.submit();
  }

  getStatusCompany() {
    this.service.getStatusCompany(this.empresa).subscribe(res => {
      this.dataSelect = res;
    });
  }

  getStatusLiquidation() {
    this.service.getStatusLiquidation(this.empresa).subscribe(res => {
      console.log('res', res);
    });
  }

  openDialog(code: string) {
    this.dialog.open(StatusLiqDialogComponent, {
      data: code,
      disableClose: true
    });
  }

  openNFSDialog(code: string) {
    this.dialog.open(NFDialogComponent, {
      data: code,
      disableClose: true
    });
  }

  submit() {
    this.loadingIndicator = true;
    let situacaoFormat = "TODOS";
    const situacao = this.form.get("situacao")?.value;
    const dataInicial = this.form.get("dataInicial")?.value;
    const dataFinal = this.form.get("dataFinal")?.value;
    const dataAGInicial = this.form.get("dataAGInicial")?.value;
    const dataAGFinal = this.form.get("dataAGFinal")?.value;
    const dataCARInicial = this.form.get("dataCARInicial")?.value;
    const dataCARFinal = this.form.get("dataCARFinal")?.value;
    const option = this.form.get("option")?.value;

    if (situacao?.length !== 0) {
      situacaoFormat = "";
      situacao?.forEach((item: any) => {
        return situacaoFormat += item.nomesituacao + ",";
      });
    }

    this.service.getAllData(
      dataInicial ? moment(this.form.get("dataInicial")?.value).format('YYYY/MM/DD').replaceAll('/', "") : '@',
      dataFinal ? moment(this.form.get("dataFinal")?.value).format('YYYY/MM/DD').replaceAll('/', "") : '@',
      this.empresa,
      dataAGInicial ? moment(this.form.get("dataAGInicial")?.value).format('YYYY/MM/DD').replaceAll('/', "") : '@',
      dataAGFinal ? moment(this.form.get("dataAGFinal")?.value).format('YYYY/MM/DD').replaceAll('/', "") : '@',
      dataCARInicial ? moment(this.form.get("dataCARInicial")?.value).format('YYYY/MM/DD').replaceAll('/', "") : '@',
      dataCARFinal ? moment(this.form.get("dataCARFinal")?.value).format('YYYY/MM/DD').replaceAll('/', "") : '@',
      option,
      situacaoFormat
    ).subscribe((res: any) => {
      this.loadingIndicator = false;
      this.temp = [...res];
      this.rows = res;

    }, error => {
      console.error(error);
      this.loadingIndicator = false;
    });
  }

  getRowHeight(row: any) {
    return row.height;
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d: any) {
      return d.razaosocial.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  goToOffer(liquidacao: string, dataEntregaAgenda: string, tipoFrete: string) {
    if (tipoFrete == "FOB") {
      Swal.fire('Liquidação FOB não pode ser ofertada.');
      return;
    }

    if (dataEntregaAgenda !== null && dataEntregaAgenda.trim().length > 0) {
      localStorage.setItem("formulario-gerencia-liquidacao", JSON.stringify(this.form.getRawValue()));
      this.router.navigate(['/realizacao-oferta-carga/' + liquidacao]);
    } else {
      Swal.fire('Esta liquidação não está agendada');
      return;
    }
  }

  setAgua(value: string) {
    let agua: any;
    if (value == 'AGUA') {
      agua = "DE";
    }
    return agua;
  }
}
