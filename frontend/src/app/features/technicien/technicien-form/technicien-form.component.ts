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
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    RouterModule,
    HttpClientModule
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
    private router: Router,
    private http: HttpClient
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
    this.http.get<any[]>('http://localhost:8080/api/machines').subscribe(
      (machines) => {
        this.machines = machines;
        this.machinesLoading = false;
      },
      (error) => {
        console.error('Error loading machines:', error);
        this.machinesLoading = false;
      }
    );
  }

  loadTechnicien(id: number): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/techniciens/${id}`).subscribe(
      (technicien) => {
        this.technicienForm.patchValue(technicien);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement du technicien';
        this.loading = false;
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.technicienForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const technicienData = this.technicienForm.value;

    if (this.isEditMode && this.technicienId) {
      // Update existing technicien
      this.http.put(`http://localhost:8080/api/techniciens/${this.technicienId}`, technicienData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/techniciens']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la modification du technicien';
          console.error(error);
        }
      );
    } else {
      // Create new technicien
      this.http.post('http://localhost:8080/api/techniciens', technicienData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/techniciens']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la création du technicien';
          console.error(error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/techniciens']);
  }
}
