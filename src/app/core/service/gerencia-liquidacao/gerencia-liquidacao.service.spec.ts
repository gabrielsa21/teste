import { TestBed } from '@angular/core/testing';

import { GerenciaLiquidacaoService } from './gerencia-liquidacao.service';

describe('GerenciaLiquidacaoService', () => {
  let service: GerenciaLiquidacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciaLiquidacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
