import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { AgendamentoService } from "src/app/core/service/agendamento/agendamento.service";


@Component({
  selector: 'app-agendamento-cliente',
  templateUrl: './agendamento-cliente.component.html',
  styleUrls: ['./agendamento-cliente.component.scss'],
})
export class AgendamentoClienteComponent implements OnInit {

  form!: FormGroup;
  nomeCliente!: string | null;
  codigo!: any;
  dataList: any = [];
  selecaoAgendamento: any = [];

  constructor(
    private service: AgendamentoService,
    private router: Router,
    private fb: FormBuilder
  ) {

  }

  get formularioAgendamentos() {
    return (<FormArray>this.form.get('item')).controls;
  }

  ngOnInit() {
    this.initForm();
    this._getStorage();
    this._obtemPedidoAgendamento();
  }

  initForm() {
    this.form = this.fb.group({
      item: new FormArray([])
    });
  }

  clienteSelecionado(data: any, event: any) {
    if (event.checked) {
      this.selecaoAgendamento.push(data);
    }

    if (!event.checked) {
      this.selecaoAgendamento.forEach((item: any, index: number) => {
        if (item.numped == data.numped) return this.selecaoAgendamento.splice(index, 1);
      });
    };
  }

  goToBack() {
    this.router.navigate(['/agendamentos'])
  }

  getSuggestDate(pedido: string, data: string) {
    
    if (data.trim().length > 0) {
      data = moment(data).format("DD@MM@YYYY");
    }

    this.dataList.forEach((item: any) => {
      if (item.numped == pedido) {
        item.dtsugerida = data;
      }
    });
  }

  submit() {
    const value = this.selecaoAgendamento;
    localStorage.setItem("pedidosSelecionados", JSON.stringify(value));
    this.router.navigate(['detalhes-pedidos-clientes']);
  }

  private _getStorage() {
    this.nomeCliente = localStorage.getItem("nomecliente");
    this.codigo = localStorage.getItem("codcli");
  }

  private _obtemPedidoAgendamento() {
    localStorage.setItem("cliente", this.codigo);
    this.service.obtemPedidoCliente(this.codigo).subscribe(res => {
      this.dataList = res;
    });
  }
}