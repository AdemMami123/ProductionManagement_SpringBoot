import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-technicien-form',
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
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './technicien-form.component.html',
  styleUrls: ['./technicien-form.component.scss']
})
export class TechnicienFormComponent implements OnInit {
  technicienForm!: FormGroup;
  isEditMode = false;
  technicienId?: number;
  loading = false;
  submitLoading = false;
  errorMessage: string | null = null;
  machines: any[] = [];
  machinesLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMachines();
    
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'new') {
        this.isEditMode = true;
        this.technicienId = +params['id'];
        this.loadTechnicien(this.technicienId);
      }
    });
  }

  initForm(): void {
    this.technicienForm = this.fb.group({
      nom: ['', [Validators.required]],
      competences: ['', [Validators.required]],
      machineAssignee: [null]
    });
  }

  loadMachines(): void {
    this.machinesLoading = true;
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      this.machines = [
        { id: 1, nom: 'Machine A' },
        { id: 2, nom: 'Machine B' },
        { id: 3, nom: 'Machine C' }
      ];
      this.machinesLoading = false;
    }, 1000);
  }

  loadTechnicien(id: number): void {
    this.loading = true;
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      const technicien = {
        id: id,
        nom: 'Technicien ' + id,
        competences: 'Mécanique, Électronique',
        machineAssignee: id % 2 === 0 ? 1 : null
      };
      
      this.technicienForm.patchValue(technicien);
      this.loading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.technicienForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const technicienData = this.technicienForm.value;
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      console.log('Technicien saved:', technicienData);
      this.submitLoading = false;
      this.router.navigate(['/techniciens']);
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/techniciens']);
  }
}
