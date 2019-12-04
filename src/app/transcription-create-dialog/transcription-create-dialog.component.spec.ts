import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionCreateDialogComponent } from './transcription-create-dialog.component';

describe('TranscriptionCreateDialogComponent', () => {
  let component: TranscriptionCreateDialogComponent;
  let fixture: ComponentFixture<TranscriptionCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
