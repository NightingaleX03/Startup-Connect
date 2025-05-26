import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../client/frontend-app/src/app/app.component';
 
bootstrapApplication(AppComponent)
  .catch(err => console.error(err)); 