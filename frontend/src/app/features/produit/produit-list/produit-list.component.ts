import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit {
  produits: any[] = [];
  displayedColumns: string[] = ['id', 'nom', 'type', 'stock', 'fournisseur', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit(): void {
    // This will be replaced with actual API service call
    this.fetchProduits();
  }

  fetchProduits(): void {
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.produits = [
        { id: 1, nom: 'Produit 1', type: 'Type A', stock: 100, fournisseur: 'Fournisseur X' },
        { id: 2, nom: 'Produit 2', type: 'Type B', stock: 200, fournisseur: 'Fournisseur Y' },

      ];
      this.loading = false;
    }, 1000);
  }

  editProduit(id: number): void {
    console.log(`Edit produit with ID: ${id}`);
    // Navigation will be implemented
  }

  deleteProduit(id: number): void {
    console.log(`Delete produit with ID: ${id}`);
    // Delete functionality will be implemented
  }
}
