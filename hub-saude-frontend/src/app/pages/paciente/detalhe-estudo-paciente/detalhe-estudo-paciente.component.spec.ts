import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEstudoPacienteComponent } from './detalhe-estudo-paciente.component';

describe('DetalheEstudoPacienteComponent', () => {
  let component: DetalheEstudoPacienteComponent;
  let fixture: ComponentFixture<DetalheEstudoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEstudoPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheEstudoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
