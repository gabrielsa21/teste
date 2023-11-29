import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { GerenciaLiquidacaoService } from "src/app/core/service/gerencia-liquidacao/gerencia-liquidacao.service";


@Component({
  selector: 'app-nf-dialog',
  templateUrl: './nf-dialog.component.html',
  styleUrls: ['./nf-dialog.component.scss'],
})
export class NFDialogComponent implements OnInit {
  imagemNotaFiscal: any;
  displayedColumns: string[] = [
    'numNF',
    'dtNF',
    'dtAgendada',
    'cdCli',
    'razaoSocial',
    'vlrTotal',
    'peso',
    'qtdCaixa',
    'numPed',
    'codCid',
    'cidade',
    'operacao',
    'prazo',
    'obs',
    'obsLogistica',
    'pedidoCompra',
    'dtEntrega',
  ];
  empresa = '2';
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private service: GerenciaLiquidacaoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this._obterNotasFiscais();
  }

  private _obterNotasFiscais() {
    const data = {
      code: this.data,
      empresa: this.empresa
    };

    this.service.ObtemNotasFiscais(data).subscribe(res => {
      console.log('res', res);
      this.dataSource.data = res;
    });
  }
}