import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    MatChipsModule,
    HttpClientModule
  ],
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit {
  machines: any[] = [];
  displayedColumns: string[] = ['id', 'nom', 'etat', 'maintenanceProchaine', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchMachines();
  }

  fetchMachines(): void {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/machines').subscribe(
      (data) => {
        this.machines = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching machines:', error);
        this.errorMessage = 'Erreur lors du chargement des machines.';
        this.loading = false;
      }
    );
  }

  getEtatClass(etat: string): string {
    switch (etat) {
      case 'EN_SERVICE': return 'etat-service';
      case 'EN_PANNE': return 'etat-panne';
      case 'EN_MAINTENANCE': return 'etat-maintenance';
      default: return '';
    }
  }

  getEtatLabel(etat: string): string {
    switch (etat) {
      case 'EN_SERVICE': return 'En service';
      case 'EN_PANNE': return 'En panne';
      case 'EN_MAINTENANCE': return 'En maintenance';
      default: return etat;
    }
  }

  editMachine(id: number): void {
    this.router.navigate(['/machines', id]);
  }

  deleteMachine(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette machine?')) {
      this.http.delete(`http://localhost:8080/api/machines/${id}`).subscribe(
        () => {
          console.log(`Machine with ID: ${id} has been deleted`);
          this.fetchMachines(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting machine:', error);
          this.errorMessage = 'Erreur lors de la suppression de la machine.';
        }
      );
    }
  }
}
