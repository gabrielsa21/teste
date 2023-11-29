import { TestBed } from '@angular/core/testing';
import { OfertaCargaService } from './oferta-carga.service';


describe('OfertaCargaService', () => {
  let service: OfertaCargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertaCargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
