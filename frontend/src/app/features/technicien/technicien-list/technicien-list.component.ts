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
  selector: 'app-technicien-list',
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
  templateUrl: './technicien-list.component.html',
  styleUrls: ['./technicien-list.component.scss']
})
export class TechnicienListComponent implements OnInit {
  techniciens: any[] = [];
  displayedColumns: string[] = ['id', 'nom', 'competences', 'machineAssignee', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit(): void {
    // Will be replaced with actual API service call
    this.fetchTechniciens();
  }

  fetchTechniciens(): void {
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.techniciens = [
        { id: 1, nom: 'Jean Dupont', competences: 'Mécanique, Électronique', machineAssignee: 'Machine A' },
        { id: 2, nom: 'Marie Martin', competences: 'Automatisme, Informatique', machineAssignee: null },
        { id: 3, nom: 'Pierre Durand', competences: 'Hydraulique, Pneumatique', machineAssignee: 'Machine B' }
      ];
      this.loading = false;
    }, 1000);
  }

  editTechnicien(id: number): void {
    console.log(`Edit technicien with ID: ${id}`);
    // Navigation will be implemented
  }

  deleteTechnicien(id: number): void {
    console.log(`Delete technicien with ID: ${id}`);
    // Delete functionality will be implemented
  }

  assignToMachine(id: number): void {
    console.log(`Assign technicien with ID: ${id} to a machine`);
    // Assignment functionality will be implemented
  }
}
