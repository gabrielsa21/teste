import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FreteService {

  FRETE = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  obtemPedidosPendentes(): Observable<any> {
    return this._http.get(`${this.FRETE}ObtemDadosPedidosPendentesComposicaoFrete/2/@/@`);
  }

  enviaPedidoParaComercial(empresa: string, pedido: string): Observable<any> {
    return this._http.get(`${this.FRETE}PedidoParaAjusteComercial/${empresa}/${pedido}`);
  }

  obtemProdutos(numped: string,
    vlrtotalcard4: string,
    aliquotacreditoimposto: string,
    r1: number,
    r2: number,
    r3: number,
    r4: number,
    vlrporkg: string): Observable<any> {
    console.log('pedidos:' + numped);

    return this._http.get(this.FRETE + 'ObtemDadosProdutosPedidosTransicao/' + numped + '/' +
      vlrtotalcard4 + '/' +
      aliquotacreditoimposto + '/' +
      r1 + '/' + r2 + '/' + r3 + '/' +
      r4 + '/' + vlrporkg);
  }


  enviarParaAprovacao(_empresa: string,
    _vlrfrete: string,
    _tpfrete: string,
    _volume: string,
    _peso: string,
    _usuario: string,
    _tpveiculo: string,
    _qtdentregas: string,
    _aliquota: string,
    _placa: string,
    _numped: string,
    //_produtos: string,
    vlrtotalcard4: string,
    aliquotacreditoimposto: string,
    r1: number,
    r2: number,
    r3: number,
    r4: number,
    vlrporkg: string): Observable<any> {
    return this._http.get(this.FRETE + 'AtualizaDadosComposicaoFrete/' + _empresa + '/' +
      _vlrfrete + '/' +
      _tpfrete + '/' +
      _volume + '/' +
      _peso + '/' +
      _usuario + '/' +
      _tpveiculo + '/' +
      _qtdentregas + '/' +
      _aliquota + '/' +
      _placa + '/' +
      _numped + '/' +
      //_produtos + '/' +
      vlrtotalcard4 + '/' +
      aliquotacreditoimposto + '/' +
      r1 + '/' +
      r2 + '/' +
      r3 + '/' +
      r4 + '/' +
      vlrporkg);
  }
}
