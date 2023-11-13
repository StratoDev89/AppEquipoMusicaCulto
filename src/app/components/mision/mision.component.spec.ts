import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionComponent } from './mision.component';

describe('MisionComponent', () => {
  let component: MisionComponent;
  let fixture: ComponentFixture<MisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
