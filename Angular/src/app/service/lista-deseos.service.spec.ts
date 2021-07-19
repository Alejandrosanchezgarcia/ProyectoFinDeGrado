import { TestBed } from '@angular/core/testing';

import { ListaDeseosService } from './lista-deseos.service';

describe('ListaDeseosService', () => {
  let service: ListaDeseosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDeseosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
