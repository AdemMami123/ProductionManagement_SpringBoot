import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    MatProgressSpinnerModule,
    HttpClientModule // Required for HTTP requests
  ],
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit {
  produits: any[] = [];
  displayedColumns: string[] = ['id', 'nom', 'type', 'stock', 'fournisseur', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProduits();
  }

  fetchProduits(): void {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/produits').subscribe(
      (data) => {
        this.produits = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching produits:', error);
        this.errorMessage = 'Erreur lors du chargement des produits.';
        this.loading = false;
      }
    );
  }

  editProduit(id: number): void {
    console.log(`Navigating to edit produit with ID: ${id}`);
    this.router.navigate(['/produits/edit', id]);
  }

  deleteProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      this.http.delete(`http://localhost:8080/api/produits/${id}`).subscribe(
        () => {
          console.log(`Produit with ID: ${id} has been deleted`);
          this.fetchProduits(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting produit:', error);
          this.errorMessage = 'Erreur lors de la suppression du produit.';
        }
      );
    }
  }
}
