import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-startup-profile-information',
  imports: [],
  templateUrl: './startup-profile-information.component.html',
  styleUrl: './startup-profile-information.component.scss'
})
export class StartupProfileInformationComponent {

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

}
