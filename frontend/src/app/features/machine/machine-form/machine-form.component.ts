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
    RouterModule
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
    private router: Router
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
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      const machine = {
        id: id,
        nom: 'Machine ' + id,
        etat: 'EN_SERVICE',
        maintenanceProchaine: new Date()
      };
      
      this.machineForm.patchValue(machine);
      this.loading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.machineForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const machineData = this.machineForm.value;
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      console.log('Machine saved:', machineData);
      this.submitLoading = false;
      this.router.navigate(['/machines']);
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/machines']);
  }
}
