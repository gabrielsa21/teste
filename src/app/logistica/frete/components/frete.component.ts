import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { FreteService } from 'src/app/core/service/frete/frete.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'frete',
  templateUrl: './frete.component.html',
  styleUrls: ['./frete.component.scss'],
  providers: [ToastrService],
})
export class FreteComponent implements OnInit {
  rows: any;
  temp: string[] = [];
  myObjArray: any = [];
  vlrtotalgeralgeralpedido = 0;
  qtdtotalpesogeralpedido = 0;
  qtdtotalcaixageralpedido = 0;

  vlrtotalgeralpedido = 0;
  qtdtotalpesopedido = 0;
  qtdtotalcaixapedido = 0;

  form!: FormGroup;
  loadingIndicator = false;
  displayedColumns: string[] = [
    'sel', 'as', 'tpfr', 'fifo',
    'ret', 'entrega', 'dtag', 'nped',
    'pvend', 'peso', 'cdcli', 'razaosocial',
    'nomecidade', 'dtped', 'op', 'qtdcaixa', 'vlrpedido'
  ];
  dataSource = new MatTableDataSource();
  @ViewChild('table') table!: DatatableComponent;

  constructor(
    private fb: FormBuilder,
    private service: FreteService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.obtemPedidosPendentes();
  }

  setAgua(value: string) {
    let agua: any;
    if (value == 'AGUA') {
      agua = "DE";
    }
    return agua;
  }

  submit() {
    this.obtemPedidosPendentes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    console.log('filter', filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtemTotaisPedidosCalculoFreteArray() {
    var v1: number = 0;
    var v2: number = 0;
    var v3: number = 0;

    var totvlrpedido: number = 0;
    var totqtdtotalpesopedido: number = 0;
    var totqtdtotalcaixapedido: number = 0;

    this.vlrtotalgeralgeralpedido = 0;
    this.qtdtotalpesogeralpedido = 0;
    this.qtdtotalcaixageralpedido = 0;

    this.dataSource.data.forEach((element: any, index: any) => {
      v1 = Number(this.retiraMascara(element.vlrpedido));
      totvlrpedido += v1;

      v2 = Number(this.retiraMascara(element.peso));
      totqtdtotalpesopedido += v2;

      v3 = Number(this.retiraMascara(element.qtdcaixa));
      totqtdtotalcaixapedido += v3;
    });

    this.vlrtotalgeralgeralpedido = totvlrpedido;
    this.qtdtotalpesogeralpedido = totqtdtotalpesopedido;
    this.qtdtotalcaixageralpedido = totqtdtotalcaixapedido;
  }

  retiraMascara(valor: any) {
    let aux: string = "";
    valor = "" + valor;
    if ((valor.replace(",", ".") != valor)) {
      if (valor.replace(".", "") != valor) {
        aux = valor;
        valor = valor.replace(".", "");
      }
      else {
        aux = valor;
      }
      if (valor.replace(",", ".") != valor) {
        valor = valor.replace(",", ".")
      } else {
        valor = aux;
      }
    }
    return valor;
  }

  trackByFn(numped: string,
    vlrpedido: string,
    peso: string,
    qtdcaixa: string,
    flagselecionado: boolean,
    tpfrete: string) {

    var v1: number = 0;
    var v2: number = 0;
    var v3: number = 0;

    var totvlrpedido: number = 0;
    var totqtdtotalpesopedido: number = 0;
    var totqtdtotalcaixapedido: number = 0;

    this.vlrtotalgeralpedido = 0;
    this.qtdtotalpesopedido = 0;
    this.qtdtotalcaixapedido = 0;

    totvlrpedido = 0;
    totqtdtotalpesopedido = 0;
    totqtdtotalcaixapedido = 0;

    if (flagselecionado == false) {
      this.myObjArray.forEach((element: any, index: any) => {
        if (element.numped == numped) this.myObjArray.splice(index, 1);
      });
    } else {
      this.myObjArray.push({
        numped: numped,
        vlrpedido: vlrpedido,
        peso: peso,
        qtdcaixa: qtdcaixa,
        processa: flagselecionado,
        tpfrete: tpfrete
      });
    }

    this.myObjArray.forEach((item: any) => {
      if (item.processa == true) {

        v1 = Number(item.vlrpedido);
        totvlrpedido += v1;

        v2 = Number(item.peso);
        totqtdtotalpesopedido += v2;

        v3 = Number(item.qtdcaixa);
        totqtdtotalcaixapedido += v3;
      }
    })

    this.vlrtotalgeralpedido = totvlrpedido;
    this.qtdtotalpesopedido = totqtdtotalpesopedido;
    this.qtdtotalcaixapedido = totqtdtotalcaixapedido;
  }

  calculaFrete(empresa: string, vlrtotalgeralpedido: any): void {
    if (vlrtotalgeralpedido == 0) {
      Swal.fire({
        title: "Selecione ao menos 1 pedido.",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonText: 'Ok'
      });
    };

    var v4: string = "";
    var pv: number = 0;
    var valido: number = 0;

    let _v2: string = "";

    this.myObjArray.forEach((element: any) => {
      _v2 += element.numped + ',';
    });

    if (_v2.length > 0) {
      _v2 = _v2.substring(0, (_v2.length - 1));
    };

    if (this.myObjArray.length > 0) {
      this.myObjArray.forEach((element: any) => {
        if (pv == 0) {
          pv = 1;
          v4 = element.tpfrete;
        }
        if (element.tpfrete != v4) {
          valido = 1;
        }
      });

      if (valido == 0) {
        localStorage.setItem('pedidoshabilitados', _v2);
        localStorage.setItem('vlrtotalgeralpedidosselecionados', vlrtotalgeralpedido);
        localStorage.setItem('empresa', empresa);
        localStorage.setItem('tpfrete', v4);
        this.router.navigate(['/frete-calcula']);
      };
    }
  }

  enviaPedidoParaComercial(): void {
    let _v2: string = "";
    let empresa = '2';

    this.myObjArray.forEach((element: any) => {
      _v2 += element.numped + ',';
    });

    if (_v2.length > 0) {
      _v2 = _v2.substring(0, (_v2.length - 1));
    }

    console.log('v2', _v2);
    
    if (this.myObjArray.length > 0) {
      Swal.fire({
        title: 'Tem certeza?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, continuar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.enviaPedidoParaComercial(empresa, _v2).subscribe((response: any) => {
            console.log("processamento finalizado com sucesso.");
            Swal.fire({
              position: 'center',
              icon: 'info',
              title: response,
              showConfirmButton: true,
              timer: 3000
            })
          }, () => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Processamento finalizado com erro.',
              showConfirmButton: true,
              timer: 3000
            })
          });
        }
      })
    }
  }


  private initForm() {
    this.form = this.fb.group({
      cidade: [null],
      cliente: [null]
    });
  }

  private obtemPedidosPendentes() {
    this.loadingIndicator = true;
    this.service.obtemPedidosPendentes().subscribe(res => {
      this.loadingIndicator = false;
      this.dataSource.data = res;
      this.obtemTotaisPedidosCalculoFreteArray();
    }, () => {
      this.loadingIndicator = false;
    });
  }
}
