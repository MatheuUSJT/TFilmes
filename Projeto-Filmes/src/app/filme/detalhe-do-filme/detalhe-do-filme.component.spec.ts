import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDoFilmeComponent } from './detalhe-do-filme.component';

describe('DetalheDoFilmeComponent', () => {
  let component: DetalheDoFilmeComponent;
  let fixture: ComponentFixture<DetalheDoFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheDoFilmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheDoFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
