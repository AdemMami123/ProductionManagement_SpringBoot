import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenanceFormComponent implements OnInit {
  maintenanceForm!: FormGroup;
  isEditMode = false;
  maintenanceId?: number;
  loading = false;
  submitLoading = false;
  errorMessage: string | null = null;

  machines: any[] = [];
  techniciens: any[] = [];

  maintenanceTypes = [
    { value: 'PREVENTIVE', viewValue: 'Préventive' },
    { value: 'CORRECTIVE', viewValue: 'Corrective' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMachines();
    this.loadTechniciens();
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'new') {
        this.isEditMode = true;
        this.maintenanceId = +params['id'];
        this.loadMaintenance(this.maintenanceId);
      }
    });
  }

  initForm(): void {
    this.maintenanceForm = this.fb.group({
      machine: [null, [Validators.required]],
      technicien: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      type: ['PREVENTIVE', [Validators.required]]
    });
  }

  loadMachines(): void {
    this.http.get<any[]>('http://localhost:8080/api/machines').subscribe(
      (machines) => {
        this.machines = machines;
      },
      (error) => {
        console.error('Error loading machines:', error);
      }
    );
  }

  loadTechniciens(): void {
    this.http.get<any[]>('http://localhost:8080/api/techniciens').subscribe(
      (techniciens) => {
        this.techniciens = techniciens;
      },
      (error) => {
        console.error('Error loading techniciens:', error);
      }
    );
  }

  loadMaintenance(id: number): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/maintenances/${id}`).subscribe(
      (maintenance) => {
        // Convert date string to Date object for the datepicker
        if (maintenance.date) {
          maintenance.date = new Date(maintenance.date);
        }
        this.maintenanceForm.patchValue(maintenance);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement de la maintenance';
        this.loading = false;
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.maintenanceForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const maintenanceData = this.maintenanceForm.value;

    if (this.isEditMode && this.maintenanceId) {
      // Update existing maintenance
      this.http.put(`http://localhost:8080/api/maintenances/${this.maintenanceId}`, maintenanceData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/maintenances']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la modification de la maintenance';
          console.error(error);
        }
      );
    } else {
      // Create new maintenance
      this.http.post('http://localhost:8080/api/maintenances', maintenanceData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/maintenances']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la création de la maintenance';
          console.error(error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/maintenances']);
  }
}
