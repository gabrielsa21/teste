import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import * as moment from "moment";
import { AgendamentoService } from "src/app/core/service/agendamento/agendamento.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-detalhe-pedido-cliente',
  templateUrl: './detalhe-pedido-cliente.component.html',
  styleUrls: ['./detalhe-pedido-cliente.component.scss'],
})
export class DetalhePedidoClienteComponent implements OnInit {

  form!: FormGroup;
  rows: any;
  temp: string[] = [];
  loadingIndicator = false;
  // scrollBarHorizontal = window.innerWidth < 1200;
  selecaoLista: any = [];
  allList: any = [];
  cliente = localStorage.getItem("cliente");

  // @ViewChild('table') table!: DatatableComponent;

  constructor(
    private service: AgendamentoService,
    private router: Router,
    private fb: FormBuilder
  ) {

  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.scrollBarHorizontal = window.innerWidth < 1200;
  //   this.table.recalculate();
  //   this.table.recalculateColumns();
  // }

  ngOnInit() {
    this._initForm();
    this.obtemSelecaoPedido();
    this.obtemDetalhePedido();
  }

  obtemDetalhePedido() {
    this.service.obtemDetalhePedido(this.selecaoLista).subscribe((res: any) => {
      this.loadingIndicator = false;
      this.rows = res;
      this.temp = [...res];

    }, error => {
      console.error(error);
      this.loadingIndicator = false;
    });
  }

  obtemSelecaoPedido() {
    const value: any = localStorage.getItem("pedidosSelecionados");
    const valueFormat = JSON.parse(value);

    valueFormat.forEach((item: any) => {
      this.selecaoLista.push(item.numped);
    });
    this.selecaoLista = this.selecaoLista.toString();
    this.allList = valueFormat;
  }

  goToBack() {
    this.router.navigate(['/agendamentos-clientes']);
  }

  submit() {
    const senha = this.form.get("senha")?.value;
    const dataCarregamento = this.form.get("dataCarregamento")?.value;
    const dataFormat = moment(dataCarregamento).format("YYYY/MM/DD").replaceAll('/', "");

    let _v2: string = "";
    let _v3: string = "";
    let _v4: string = "";

    this.allList.forEach((item: any) => {
      _v2 += item.numped + ',';
      _v3 += item.idliquidacao + '-' + item.dtsugerida + ',';
      _v4 += item.numped + '-' +
        item.dtsugerida + '-' +
        item.idliquidacao + '-' +
        this.cliente + ',';
    });

    if (_v2.length > 0) {
      _v2 = _v2.substring(0, (_v2.length - 1));
      _v3 = _v3.substring(0, (_v3.length - 1));
      _v4 = _v4.substring(0, (_v4.length - 1));
    };

    const data = {
      senha: senha,
      agendamento: _v4,
      dataCarregamento: dataFormat
    }

    this.service.atualizaAgendamento(data).subscribe(res => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res,
        showConfirmButton: true,
        timer: 2000
      });
    }, (erro) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Processamento finalizado com erro!',
        showConfirmButton: false,
        timer: 2000
      })
      console.error(erro);
    });
  }

  enviarEmail() {
    let pedidosHabilitados: string = "";
    let dtSugeridaLiquidacao: string = "";

    this.allList.forEach((item: any) => {
      pedidosHabilitados += item.numped + ',';
      dtSugeridaLiquidacao += item.idliquidacao + '-' + item.dtsugerida + ',';
    });

    if (pedidosHabilitados.length > 0) {
      const data = {
        pedidosHabilitados: pedidosHabilitados.substring(0, (pedidosHabilitados.length - 1)),
        dtSugeridaLiquidacao: dtSugeridaLiquidacao.substring(0, (dtSugeridaLiquidacao.length - 1)),
        codidoCliente: this.cliente
      }

      this.service.enviarEmail(data).subscribe(res => {
        if (res =="ok") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'E-mail enviado com sucesso.',
            showConfirmButton: false,
            timer: 2000
          })
        } else  {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Erro ao enviar o e-mail.',
            showConfirmButton: false,
            timer: 2000
         });
        }
      }, () => { 
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro ao enviar o e-mail.',
          showConfirmButton: false,
          timer: 2000
       });
      });
    };
  }

  private _initForm() {
    this.form = this.fb.group({
      dataCarregamento: [null, Validators.required],
      senha: [null]
    })
  }
}