import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleComment } from './single-comment';

describe('SingleComment', () => {
  let component: SingleComment;
  let fixture: ComponentFixture<SingleComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
