/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusicfileComponent } from './musicfile.component';

describe('MusicfileComponent', () => {
  let component: MusicfileComponent;
  let fixture: ComponentFixture<MusicfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
