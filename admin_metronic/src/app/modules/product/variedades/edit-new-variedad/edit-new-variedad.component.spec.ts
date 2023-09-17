import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewVariedadComponent } from './edit-new-variedad.component';

describe('EditNewVariedadComponent', () => {
  let component: EditNewVariedadComponent;
  let fixture: ComponentFixture<EditNewVariedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewVariedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewVariedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
