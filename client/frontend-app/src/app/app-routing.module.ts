import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  // ... your existing routes ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, // Enable hash-based routing for GitHub Pages
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { } 