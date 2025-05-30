import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCentroComponent } from './home-centro.component';

describe('HomeCentroComponent', () => {
  let component: HomeCentroComponent;
  let fixture: ComponentFixture<HomeCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCentroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
