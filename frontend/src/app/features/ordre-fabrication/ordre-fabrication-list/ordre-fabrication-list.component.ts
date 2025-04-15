import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-ordre-fabrication-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule
  ],
  templateUrl: './ordre-fabrication-list.component.html',
  styleUrls: ['./ordre-fabrication-list.component.scss']
})
export class OrdreFabricationListComponent implements OnInit {
  ordresFabrication: any[] = [];
  displayedColumns: string[] = ['id', 'produit', 'quantité', 'date', 'machine', 'statut', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit(): void {
    // Will be replaced with actual API service call
    this.fetchOrdresFabrication();
  }

  fetchOrdresFabrication(): void {
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.ordresFabrication = [
        { id: 1, produit: 'Produit A', quantité: 100, date: '2023-11-20', machine: 'Machine A', statut: 'EN_ATTENTE' },
        { id: 2, produit: 'Produit B', quantité: 50, date: '2023-11-25', machine: 'Machine B', statut: 'EN_COURS' },
        { id: 3, produit: 'Produit C', quantité: 200, date: '2023-12-01', machine: 'Machine C', statut: 'TERMINE' },
        { id: 4, produit: 'Produit D', quantité: 75, date: '2023-12-05', machine: 'Machine A', statut: 'ANNULE' }
      ];
      this.loading = false;
    }, 1000);
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'statut-attente';
      case 'EN_COURS': return 'statut-cours';
      case 'TERMINE': return 'statut-termine';
      case 'ANNULE': return 'statut-annule';
      default: return '';
    }
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'EN_COURS': return 'En cours';
      case 'TERMINE': return 'Terminé';
      case 'ANNULE': return 'Annulé';
      default: return statut;
    }
  }

  editOrdreFabrication(id: number): void {
    console.log(`Edit ordre de fabrication with ID: ${id}`);
    // Navigation will be implemented
  }

  deleteOrdreFabrication(id: number): void {
    console.log(`Delete ordre de fabrication with ID: ${id}`);
    // Delete functionality will be implemented
  }

  updateStatut(id: number, statut: string): void {
    console.log(`Update statut for ordre de fabrication ID: ${id} to ${statut}`);
    // Update functionality will be implemented
  }
}
