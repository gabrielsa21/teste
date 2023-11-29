import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { OfertaCargaService } from "src/app/core/service/oferta-carga/oferta-carga.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-oferta-carga',
  templateUrl: './oferta-carga.component.html',
  styleUrls: ['./oferta-carga.component.scss'],
})
export class OfertaCargaComponent implements OnInit {
  rows: any;
  loadingIndicator = false;
  form!: FormGroup;
  empresa = '2';
  liquidacaoCodigo!: string;
  displayedColumns: string[] = ['selecione', 'codigo', 'nomeTrasportador'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  constructor(
    private fb: FormBuilder,
    private service: OfertaCargaService,
    private router: Router,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this._initForm();
    this._obtemTransportadora();
    this._getCodeUrl();

    console.log('selection', this.selection);
    
  }

  goToBack() {
    this.router.navigate(['/gerencia-liquidacao']);
  }

  updateFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  submit() {
    const dataVencimento = this.form.get("dataVencimento")?.value;
    const dataFormat = moment(dataVencimento).format("DD-MM-YYYY");
    const code = this.liquidacaoCodigo;
    const empresa = this.empresa;
    const selected: any = this.selection.selected;

    let _v2: string = "";
    selected.forEach((element: any) => {
      _v2 += element.idtransportador + ',';
    });
    _v2 = _v2.substring(0, (_v2.length - 1));

    const data = {
      datavencimento: dataFormat,
      codigo: code,
      empresa: empresa,
      selecao: _v2
    };

    Swal.fire({
      title: 'Tem certeza?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.atualizaOfertaCarga(data).subscribe((res: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res,
            showConfirmButton: true,
            timer: 1500
          });
        }, (erro) => {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Erro na confirmação da oferta:',
            showConfirmButton: false,
            timer: 1500
          })
          console.error(erro);
        });
      }
    })
  }

  private _initForm() {
    this.form = this.fb.group({
      dataVencimento: [null, Validators.required]
    });
  }

  private _obtemTransportadora() {
    this.service.obtemTransportadora(this.empresa).subscribe(res => {
      this.dataSource.data = res;
    });
  }

  private _getCodeUrl() {
    this.actRouter.params.subscribe(res => {
      this.liquidacaoCodigo = res['id'];
    });
  }
} 