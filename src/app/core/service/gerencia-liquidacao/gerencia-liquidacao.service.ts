import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GerenciaLiquidacaoService {

  GEREN_LIQUIDACAO_URL = environment.apiUrl + 'ObtemSituacaoLiquidacao/';
  STATUS_URL = environment.apiUrl + 'ObtemSituacaoLiquidacao/';
  DATA_URL = environment.apiUrl + 'ObtemDadosLiquidacaoGerencial';
  HISTORICO_LIQUIDACAO_URL = environment.apiUrl + 'ObtemHistoricoLiquidacao';
  OBTEM_NOTAS_FISCAIS = environment.apiUrl + 'ObtemNotasFiscais';
  OBTEM_NOTA_FISCAL = environment.apiUrl + 'ObtemImagemNotaFiscal/';
  
  constructor(private _http: HttpClient) { }

  getStatusLiquidation(company: string): Observable<any> {
    return this._http.get(this.GEREN_LIQUIDACAO_URL + company);
  }

  getStatusCompany(company: string): Observable<any> {
    return this._http.get(this.STATUS_URL + company);
  }

  getAllData(
    dataInicial: string,
    dataFinal: string,
    empresa: string,
    dataAgInicial: string,
    dataAgFinal: string,
    dataCarInicial: string,
    dataCarFinal: string,
    option: string,
    filter?: string
  ) {
    return this._http.get(`${this.DATA_URL}/${dataInicial}/${dataFinal}/${empresa}/${dataAgInicial}/${dataAgFinal}/${dataCarInicial}/${dataCarFinal}/${option}/${filter}`)
  }

  ObtemHistoricoLiq(body: any): Observable<any> {
    return this._http.get(`${this.HISTORICO_LIQUIDACAO_URL}/${body.code}/${body.empresa}`);
  }

  ObtemNotasFiscais(body: any): Observable<any> {
    return this._http.get(`${this.OBTEM_NOTAS_FISCAIS}/${body.code}/${body.empresa}`);
  }

  obtemImagemNotaFiscal(numnf: string): Observable<any> {
    return this._http.get(this.OBTEM_NOTA_FISCAL + numnf);
  }
}
