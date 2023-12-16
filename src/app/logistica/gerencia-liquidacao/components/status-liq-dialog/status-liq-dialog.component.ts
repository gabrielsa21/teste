import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { GerenciaLiquidacaoService } from "src/app/core/service/gerencia-liquidacao/gerencia-liquidacao.service";


@Component({
  selector: 'app-status-liq-dialog',
  templateUrl: './status-liq-dialog.component.html',
  styleUrls: ['./status-liq-dialog.component.scss'],
})
export class StatusLiqDialogComponent implements OnInit {
  displayedColumns: string[] = ['movimentacao', 'horario', 'descricao', 'tempo'];
  empresa = '2';
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private service: GerenciaLiquidacaoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this._obterHistorico();
  }

  private _obterHistorico() {
    const data = {
      code: this.data,
      empresa: this.empresa
    };

    this.service.obtemHistoricoLiq(data).subscribe(res => {
      this.dataSource.data = res;
    });
  }
}