import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEstudoComponent } from './criar-estudo.component';

describe('CriarEstudoComponent', () => {
  let component: CriarEstudoComponent;
  let fixture: ComponentFixture<CriarEstudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarEstudoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarEstudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
