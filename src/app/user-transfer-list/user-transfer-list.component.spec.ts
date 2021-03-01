import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransferListComponent } from './user-transfer-list.component';

describe('UserTransferListComponent', () => {
  let component: UserTransferListComponent;
  let fixture: ComponentFixture<UserTransferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
