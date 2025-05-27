import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupProfileInformationComponent } from './startup-profile-information.component';

describe('StartupProfileInformationComponent', () => {
  let component: StartupProfileInformationComponent;
  let fixture: ComponentFixture<StartupProfileInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupProfileInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupProfileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
