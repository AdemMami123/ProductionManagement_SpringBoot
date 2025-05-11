import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

// Dialog component for machine assignment
@Component({
  selector: 'assign-machine-dialog',
  template: `
    <h2 mat-dialog-title>Assigner une machine</h2>
    <mat-dialog-content>
      <mat-form-field style="width: 100%;">
        <mat-label>Machine</mat-label>
        <mat-select [(ngModel)]="selectedMachineId">
          <mat-option *ngFor="let machine of data.machines" [value]="machine.id">
            {{machine.nom}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Annuler</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="selectedMachineId" [disabled]="!selectedMachineId">
        Confirmer
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class AssignMachineDialog {
  selectedMachineId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AssignMachineDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {machines: any[]}
  ) {}
}

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
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './technicien-list.component.html',
  styleUrls: ['./technicien-list.component.scss']
})
export class TechnicienListComponent implements OnInit {
  techniciens: any[] = [];
  displayedColumns: string[] = ['id', 'nom', 'competences', 'machineAssignee', 'actions'];
  loading = true;
  errorMessage: string | null = null;
  machines: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchTechniciens();
    this.fetchMachines(); // Load machines for assignment
  }

  fetchTechniciens(): void {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/techniciens').subscribe(
      (data) => {
        this.techniciens = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching techniciens:', error);
        this.errorMessage = 'Erreur lors du chargement des techniciens.';
        this.loading = false;
      }
    );
  }

  fetchMachines(): void {
    this.http.get<any[]>('http://localhost:8080/api/machines').subscribe(
      (data) => {
        this.machines = data;
      },
      (error) => {
        console.error('Error fetching machines:', error);
      }
    );
  }

  editTechnicien(id: number): void {
    this.router.navigate(['/techniciens', id]);
  }

  deleteTechnicien(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce technicien?')) {
      this.http.delete(`http://localhost:8080/api/techniciens/${id}`).subscribe(
        () => {
          console.log(`Technicien with ID: ${id} has been deleted`);
          this.fetchTechniciens(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting technicien:', error);
          this.errorMessage = 'Erreur lors de la suppression du technicien.';
        }
      );
    }
  }

  assignToMachine(technicienId: number): void {
    // Open a dialog to select a machine
    const assignDialog = this.dialog.open(AssignMachineDialog, {
      width: '400px',
      data: { machines: this.machines }
    });

    assignDialog.afterClosed().subscribe(machineId => {
      if (machineId) {
        this.http.post(`http://localhost:8080/api/techniciens/${technicienId}/assign-machine`, { machineId }).subscribe(
          () => {
            console.log(`Technicien with ID: ${technicienId} assigned to machine ID: ${machineId}`);
            this.fetchTechniciens(); // Refresh the list after assignment
          },
          (error) => {
            console.error('Error assigning machine to technicien:', error);
            this.errorMessage = 'Erreur lors de l\'assignation de la machine au technicien.';
          }
        );
      }
    });
  }
}
