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
    RouterModule
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
    private router: Router
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
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.machines = [
        { id: 1, nom: 'Machine A' },
        { id: 2, nom: 'Machine B' },
        { id: 3, nom: 'Machine C' }
      ];
    }, 1000);
  }

  loadTechniciens(): void {
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.techniciens = [
        { id: 1, nom: 'Jean Dupont' },
        { id: 2, nom: 'Marie Martin' },
        { id: 3, nom: 'Pierre Durand' }
      ];
    }, 1000);
  }

  loadMaintenance(id: number): void {
    this.loading = true;
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      const maintenance = {
        id: id,
        machine: 1,
        technicien: 2,
        date: new Date(),
        type: 'PREVENTIVE'
      };
      
      this.maintenanceForm.patchValue(maintenance);
      this.loading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.maintenanceForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const maintenanceData = this.maintenanceForm.value;
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      console.log('Maintenance saved:', maintenanceData);
      this.submitLoading = false;
      this.router.navigate(['/maintenances']);
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/maintenances']);
  }
}
