import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FreteService } from "src/app/core/service/frete/frete.service";
import Swal from "sweetalert2";

@Component({
  selector: 'frete-calcula',
  templateUrl: './frete-calcula.component.html',
  styleUrls: ['./frete-calcula.component.scss'],
})
export class FreteCalculaComponent implements OnInit {
  loading: boolean = false;
  errorMessage: any;
  totalVlrCard4: any;
  vlrdistribuicao: any;
  produtos!: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'produto', 'descricao', 'pesounitario', 'totalpeso', 'freteunitario',
    'fretetotal', 'totalcaixa', 'valortotal'
  ];

  constructor(
    private router: Router,
    private service: FreteService
  ) { }

  ngOnInit() {

  }

  goToBack() {
    this.router.navigate(['/frete']);
  }

  public callProdutos(aliquotacreditoimposto: string,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    r4: boolean,
    vlrporkg: string,
    vlrfretecontr: string,
    vlrdescarga: string,
    vlrdistribuicao_: string,
    percsobretotalnf: string) {
    this.loading = true;
    this.errorMessage = "";
    this.totalVlrCard4 = "0.00";

    let _r1: number = 0;
    let _r2: number = 0;
    let _r3: number = 0;
    let _r4: number = 0;
    let _totalVlrCard4: number = 0;

    if (r1) {
      _r1 = 1;
    } else if (r2) {
      _r2 = 1;
    } else if (r3) {
      _r3 = 1;
      var _vlrfretecontr = Number(vlrfretecontr);
      var _vlrdescarga = Number(vlrdescarga);
      var _vlrdistribuicao = Number(vlrdistribuicao_);
      var _percsobretotalnf = Number(percsobretotalnf);

      var data1 = Number(localStorage.getItem('vlrtotalgeralpedidosselecionados'));

      if (_percsobretotalnf == 0) {
        this.totalVlrCard4 = (_vlrfretecontr + _vlrdescarga + _vlrdistribuicao);
      } else {
        this.totalVlrCard4 = (_vlrfretecontr + _vlrdescarga + (data1 * _percsobretotalnf / 100));
      }

      if (_vlrfretecontr + _vlrdescarga + _vlrdistribuicao <= 0) {
        this.errorMessage = "Por favor, informar o valor total.";

        this.totalVlrCard4 = "0.00";
        return;
      }
    } else if (r4) {
      _r4 = 1;
    }

    let data: any = localStorage.getItem('pedidoshabilitados');
    this.service.obtemProdutos(data,
      this.totalVlrCard4,
      aliquotacreditoimposto,
      _r1,
      _r2,
      _r3,
      _r4,
      vlrporkg)
      .subscribe(
        (response) => {                           
          this.produtos = null;
          this.produtos = response;
          this.dataSource.data = response;
          if (this.produtos.length == 0) {
            Swal.fire({
              position: 'top-end',
              icon: 'info',
              title: "Existem UF diferentes neste conjunto de pedidos.",
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        (error: any) => {                            
          console.error('Processamento finalizado com erro')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                
          console.error('Processamento finalizado.')       
          this.loading = false;
        })
  }

  enviarParaAprovacao(produtos: any,
    _ciffob: boolean,
    _usuario: string,
    _carreta: boolean,
    _qtdentregas: string,
    _aliquota: string,
    _placa: string,
    aliquotacreditoimposto: string,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    r4: boolean,
    vlrporkg: string,
    vlrfretecontr: string,
    vlrdescarga: string,
    vlrdistribuicao_: string,
    percsobretotalnf: string) {

    this.totalVlrCard4 = "0.00";

    let _r1: number = 0;
    let _r2: number = 0;
    let _r3: number = 0;
    let _r4: number = 0;
    let _totalVlrCard4: number = 0;

    if (r1) {
      _r1 = 1;
    } else if (r2) {
      _r2 = 1;
    } else if (r3) {
      _r3 = 1;

      var _vlrfretecontr = Number(vlrfretecontr);
      var _vlrdescarga = Number(vlrdescarga);
      var _vlrdistribuicao = Number(vlrdistribuicao_);
      var _percsobretotalnf = Number(percsobretotalnf);

      var data1 = Number(localStorage.getItem('vlrtotalgeralpedidosselecionados'));

      if (_percsobretotalnf == 0) {
        this.totalVlrCard4 = (_vlrfretecontr + _vlrdescarga + _vlrdistribuicao);
      } else {
        this.totalVlrCard4 = (_vlrfretecontr + _vlrdescarga + (data1 * _percsobretotalnf / 100));
      }

      if (_vlrfretecontr + _vlrdescarga + _vlrdistribuicao <= 0) {
        this.errorMessage = "Por favor, informar o valor total.";
        this.totalVlrCard4 = "0.00";
        return;
      }
    } else if (r4) {
      _r4 = 1;
    }

    var flag: boolean = false;

    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, continuar!'
    }).then((result) => {
      if (result.isConfirmed) {

        let _vlrfrete: any;
        let _volume: any;
        let _peso: any;
        let _produtos: any;

        produtos.forEach((element: any, index: number) => {
          _produtos += element.produto + '-' + element.vlrfretetotal + ',';
          if (index == 0) {
            _vlrfrete = (element.totalfretebruto - element.totaldeducaoimp);
            _volume = element.totalgeralcaixas;
            _peso = element.totalgeralpeso;
          }
        });
        if (_produtos.length > 0) {
          _produtos = _produtos.substring(0, (_produtos.length - 1));
        }

        var _tpveiculo: any = "";
        var _tpfrete: any = "";

        if (_carreta == true) {
          _tpveiculo = "C";
        } else {
          _tpveiculo = "T";
        }
        if (_placa.trim().length == 0) {
          _placa = "XXX-0000";
        }
        let _data: any = localStorage.getItem('pedidoshabilitados');
        let _empresa: any = localStorage.getItem('empresa');
        _tpfrete = localStorage.getItem('tpfrete');
        if (_tpfrete == "CIF") {
          _tpfrete = "N";
        } else {
          _tpfrete = "S";
        }

        this.service.enviarParaAprovacao(_empresa,
          _vlrfrete,
          _tpfrete,
          _volume,
          _peso,
          _usuario,
          _tpveiculo,
          _qtdentregas,
          _aliquota,
          _placa,
          _data,
          this.totalVlrCard4,
          aliquotacreditoimposto,
          _r1,
          _r2,
          _r3,
          _r4,
          vlrporkg)
          .subscribe(
            (response) => {
              this.produtos = null;
              this.loading = false;
              localStorage.removeItem("pedidoshabilitados");
              Swal.fire({
                icon: 'success',
                title: response,
                text: 'Processamento finalizado com sucesso',
                showConfirmButton: true,
                timer: 3000
              });
            },
            (error: any) => {
              console.error('Processamento finalizado com erro')
              this.errorMessage = error;
              this.loading = false;
              Swal.fire({
                icon: 'error',
                title: error,
                text: 'Processamento finalizado com erro',
                showConfirmButton: true,
                timer: 3000
              });
            },
            () => {
              console.error('Processamento finalizado.')
              this.loading = false;
            })
        window.history.go(-1);
      }
    })
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
}