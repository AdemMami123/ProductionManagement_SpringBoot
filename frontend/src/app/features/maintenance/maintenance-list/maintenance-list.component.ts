import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    MatChipsModule,
    HttpClientModule
  ],
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {
  maintenances: any[] = [];
  displayedColumns: string[] = ['id', 'machine', 'technicien', 'date', 'type', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchMaintenances();
  }

  fetchMaintenances(): void {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/maintenances').subscribe(
      (data) => {
        this.maintenances = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching maintenances:', error);
        this.errorMessage = 'Erreur lors du chargement des maintenances.';
        this.loading = false;
      }
    );
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'PREVENTIVE': return 'type-preventive';
      case 'CORRECTIVE': return 'type-corrective';
      default: return '';
    }
  }

  editMaintenance(id: number): void {
    this.router.navigate(['/maintenances', id]);
  }

  deleteMaintenance(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette maintenance?')) {
      this.http.delete(`http://localhost:8080/api/maintenances/${id}`).subscribe(
        () => {
          console.log(`Maintenance with ID: ${id} has been deleted`);
          this.fetchMaintenances(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting maintenance:', error);
          this.errorMessage = 'Erreur lors de la suppression de la maintenance.';
        }
      );
    }
  }
}
