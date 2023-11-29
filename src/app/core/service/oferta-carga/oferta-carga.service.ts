import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class OfertaCargaService {

  OBTEM_TRANSP_URL = environment.apiUrl + 'ObtemTransportadoras/';
  ATUALIZA_OFERTA_CARGA_URL = environment.apiUrl + 'AtualizaOfertaCarga';

  constructor(private _http: HttpClient) { }

  obtemTransportadora(body: string): Observable<any> {
    return this._http.get(this.OBTEM_TRANSP_URL + body);
  }

  atualizaOfertaCarga(body: any) {
    return this._http.get(`${this.ATUALIZA_OFERTA_CARGA_URL}/${body.codigo}/${body.selecao}/${body.datavencimento}/${body.empresa}`);
  }
} 