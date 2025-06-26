import { TestBed } from '@angular/core/testing';

import { ParticipacaoService } from './participacao.service';

describe('ParticipacaoService', () => {
  let service: ParticipacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
