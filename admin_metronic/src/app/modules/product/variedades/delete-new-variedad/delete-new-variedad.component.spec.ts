import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNewVariedadComponent } from './delete-new-variedad.component';

describe('DeleteNewVariedadComponent', () => {
  let component: DeleteNewVariedadComponent;
  let fixture: ComponentFixture<DeleteNewVariedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNewVariedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNewVariedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
