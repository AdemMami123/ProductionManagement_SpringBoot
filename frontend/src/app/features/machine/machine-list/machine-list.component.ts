import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit {
  machines: any[] = [];
  displayedColumns: string[] = ['id', 'nom', 'etat', 'maintenanceProchaine', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit(): void {
    // Will be replaced with actual API service call
    this.fetchMachines();
  }

  fetchMachines(): void {
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.machines = [
        { id: 1, nom: 'Machine A', etat: 'EN_SERVICE', maintenanceProchaine: '2023-12-15' },
        { id: 2, nom: 'Machine B', etat: 'EN_MAINTENANCE', maintenanceProchaine: '2023-11-20' },
        { id: 3, nom: 'Machine C', etat: 'EN_PANNE', maintenanceProchaine: '2023-11-10' }
      ];
      this.loading = false;
    }, 1000);
  }

  getEtatClass(etat: string): string {
    switch (etat) {
      case 'EN_SERVICE': return 'etat-service';
      case 'EN_PANNE': return 'etat-panne';
      case 'EN_MAINTENANCE': return 'etat-maintenance';
      default: return '';
    }
  }

  editMachine(id: number): void {
    console.log(`Edit machine with ID: ${id}`);
    // Navigation will be implemented
  }

  deleteMachine(id: number): void {
    console.log(`Delete machine with ID: ${id}`);
    // Delete functionality will be implemented
  }
}
