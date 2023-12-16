import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {

  AGENDAMENTO_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  obtemPedidosParaAgendamento(
    dataInicial: string,
    dataFinal: string,
    cliente: string,
    cidade: string,
  ): Observable<any> {
    return this.http.get(`${this.AGENDAMENTO_URL}ObtemPedidosParaAgendamento/${dataInicial}/${dataFinal}/2/${cliente}/${cidade}`);
  }

  obtemPedidoCliente(codigo: any): Observable<any> {
    return this.http.get(`${this.AGENDAMENTO_URL}ObtemPedidosClienteParaAgendamento/${codigo}/2/@/@`);
  }

  obtemDetalhePedido(body: string): Observable<any> {
    return this.http.get(`${this.AGENDAMENTO_URL}ObtemDetalhePedidoCliente/${body}/2`);
  }

  atualizaAgendamento(body: any): Observable<any> {  
    return this.http.get(`${this.AGENDAMENTO_URL}AtualizaAgendamento/${body.agendamento}/2/${body.dataCarregamento}/${body.senha}`);
  }

  enviarEmail(body: any): Observable<any> {
    return this.http.get(`${this.AGENDAMENTO_URL}EnviarEmailAgendamentoPedidoCliente/${body.pedidosHabilitados}/2/${body.codidoCliente}/${body.dtSugeridaLiquidacao}`)
  }
}