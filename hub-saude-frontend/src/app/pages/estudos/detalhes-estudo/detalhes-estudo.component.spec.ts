import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesEstudoComponent } from './detalhes-estudo.component';

describe('DetalhesEstudoComponent', () => {
  let component: DetalhesEstudoComponent;
  let fixture: ComponentFixture<DetalhesEstudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesEstudoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesEstudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
