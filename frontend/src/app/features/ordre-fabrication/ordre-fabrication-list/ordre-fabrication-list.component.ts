import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    MatMenuModule,
    HttpClientModule
  ],
  templateUrl: './ordre-fabrication-list.component.html',
  styleUrls: ['./ordre-fabrication-list.component.scss']
})
export class OrdreFabricationListComponent implements OnInit {
  ordresFabrication: any[] = [];
  displayedColumns: string[] = ['id', 'produit', 'quantité', 'date', 'machine', 'statut', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrdresFabrication();
  }

  fetchOrdresFabrication(): void {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/ordres-fabrication').subscribe(
      (data) => {
        this.ordresFabrication = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching ordres de fabrication:', error);
        this.errorMessage = 'Erreur lors du chargement des ordres de fabrication.';
        this.loading = false;
      }
    );
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
    this.router.navigate(['/ordres-fabrication', id]);
  }

  deleteOrdreFabrication(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet ordre de fabrication?')) {
      this.http.delete(`http://localhost:8080/api/ordres-fabrication/${id}`).subscribe(
        () => {
          console.log(`Ordre de fabrication with ID: ${id} has been deleted`);
          this.fetchOrdresFabrication(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting ordre de fabrication:', error);
          this.errorMessage = 'Erreur lors de la suppression de l\'ordre de fabrication.';
        }
      );
    }
  }

  updateStatut(id: number, statut: string): void {
    this.http.put(`http://localhost:8080/api/ordres-fabrication/${id}/status`, { status: statut }).subscribe(
      () => {
        console.log(`Statut of ordre de fabrication ID: ${id} updated to ${statut}`);
        this.fetchOrdresFabrication(); // Refresh the list to show updated status
      },
      (error) => {
        console.error('Error updating statut:', error);
        this.errorMessage = 'Erreur lors de la mise à jour du statut.';
      }
    );
  }
}
