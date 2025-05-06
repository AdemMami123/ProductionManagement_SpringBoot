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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-machine-form',
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
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './machine-form.component.html',
  styleUrls: ['./machine-form.component.scss']
})
export class MachineFormComponent implements OnInit {
  machineForm!: FormGroup;
  isEditMode = false;
  machineId?: number;
  loading = false;
  submitLoading = false;
  errorMessage: string | null = null;
  etats = [
    { value: 'EN_SERVICE', viewValue: 'En service' },
    { value: 'EN_PANNE', viewValue: 'En panne' },
    { value: 'EN_MAINTENANCE', viewValue: 'En maintenance' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'new') {
        this.isEditMode = true;
        this.machineId = +params['id'];
        this.loadMachine(this.machineId);
      }
    });
  }

  initForm(): void {
    this.machineForm = this.fb.group({
      nom: ['', [Validators.required]],
      etat: ['EN_SERVICE', [Validators.required]],
      maintenanceProchaine: [new Date(), [Validators.required]]
    });
  }

  loadMachine(id: number): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/machines/${id}`).subscribe(
      (machine) => {
        // Convert date string to Date object for the datepicker
        if (machine.maintenanceProchaine) {
          machine.maintenanceProchaine = new Date(machine.maintenanceProchaine);
        }
        this.machineForm.patchValue(machine);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement de la machine';
        this.loading = false;
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.machineForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const machineData = this.machineForm.value;

    if (this.isEditMode && this.machineId) {
      // Update existing machine
      this.http.put(`http://localhost:8080/api/machines/${this.machineId}`, machineData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/machines']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la modification de la machine';
          console.error(error);
        }
      );
    } else {
      // Create new machine
      this.http.post('http://localhost:8080/api/machines', machineData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/machines']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la création de la machine';
          console.error(error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/machines']);
  }
}
