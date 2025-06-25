import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarEstudosComponent } from './pesquisar-estudos.component';

describe('PesquisarEstudosComponent', () => {
  let component: PesquisarEstudosComponent;
  let fixture: ComponentFixture<PesquisarEstudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisarEstudosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisarEstudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
