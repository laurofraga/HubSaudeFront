import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroHomeComponent } from './centro-home.component';

describe('CentroHomeComponent', () => {
  let component: CentroHomeComponent;
  let fixture: ComponentFixture<CentroHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
