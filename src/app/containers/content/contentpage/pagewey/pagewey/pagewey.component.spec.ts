import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageweyComponent } from './pagewey.component';

describe('PageweyComponent', () => {
  let component: PageweyComponent;
  let fixture: ComponentFixture<PageweyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageweyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageweyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
