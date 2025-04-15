import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarLayoutComponent } from './shared/layout/sidebar-layout/sidebar-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarLayoutComponent],
  template: '<app-sidebar-layout></app-sidebar-layout>',
})
export class AppComponent {
  title = 'production-management';
}
