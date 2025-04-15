import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface NavItem {
  name: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent {
  isOpen = true;

  navItems: NavItem[] = [
    { name: 'Produits', route: '/produits', icon: 'inventory_2' },
    { name: 'Machines', route: '/machines', icon: 'precision_manufacturing' },
    { name: 'Techniciens', route: '/techniciens', icon: 'engineering' },
    { name: 'Maintenances', route: '/maintenances', icon: 'build' },
    { name: 'Ordres de fabrication', route: '/ordres-fabrication', icon: 'assignment' }
  ];

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
