import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEstudoPublicoComponent } from './detalhe-estudo-publico.component';

describe('DetalheEstudoPublicoComponent', () => {
  let component: DetalheEstudoPublicoComponent;
  let fixture: ComponentFixture<DetalheEstudoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEstudoPublicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheEstudoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
