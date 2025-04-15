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
  selector: 'app-maintenance-list',
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
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {
  maintenances: any[] = [];
  displayedColumns: string[] = ['id', 'machine', 'technicien', 'date', 'type', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit(): void {
    // Will be replaced with actual API service call
    this.fetchMaintenances();
  }

  fetchMaintenances(): void {
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.maintenances = [
        { id: 1, machine: 'Machine A', technicien: 'Jean Dupont', date: '2023-11-15', type: 'PREVENTIVE' },
        { id: 2, machine: 'Machine B', technicien: 'Marie Martin', date: '2023-11-20', type: 'CORRECTIVE' },
        { id: 3, machine: 'Machine C', technicien: 'Pierre Durand', date: '2023-12-01', type: 'PREVENTIVE' }
      ];
      this.loading = false;
    }, 1000);
  }

  getTypeClass(type: string): string {
    return type === 'PREVENTIVE' ? 'type-preventive' : 'type-corrective';
  }

  editMaintenance(id: number): void {
    console.log(`Edit maintenance with ID: ${id}`);
    // Navigation will be implemented
  }

  deleteMaintenance(id: number): void {
    console.log(`Delete maintenance with ID: ${id}`);
    // Delete functionality will be implemented
  }
}
