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
  selector: 'app-ordre-fabrication-form',
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
  templateUrl: './ordre-fabrication-form.component.html',
  styleUrls: ['./ordre-fabrication-form.component.scss']
})
export class OrdreFabricationFormComponent implements OnInit {
  ordreFabricationForm!: FormGroup;
  isEditMode = false;
  ordreFabricationId?: number;
  loading = false;
  submitLoading = false;
  errorMessage: string | null = null;

  produits: any[] = [];
  machines: any[] = [];

  statuts = [
    { value: 'EN_ATTENTE', viewValue: 'En attente' },
    { value: 'EN_COURS', viewValue: 'En cours' },
    { value: 'TERMINE', viewValue: 'Terminé' },
    { value: 'ANNULE', viewValue: 'Annulé' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadMachines();
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'new') {
        this.isEditMode = true;
        this.ordreFabricationId = +params['id'];
        this.loadOrdreFabrication(this.ordreFabricationId);
      }
    });
  }

  initForm(): void {
    this.ordreFabricationForm = this.fb.group({
      produit: [null, [Validators.required]],
      quantité: [0, [Validators.required, Validators.min(1)]],
      date: [new Date(), [Validators.required]],
      machine: [null, [Validators.required]],
      statut: ['EN_ATTENTE', [Validators.required]]
    });
  }

  loadProduits(): void {
    this.http.get<any[]>('http://localhost:8080/api/produits').subscribe(
      (produits) => {
        this.produits = produits;
      },
      (error) => {
        console.error('Error loading produits:', error);
      }
    );
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

  loadOrdreFabrication(id: number): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/ordres-fabrication/${id}`).subscribe(
      (ordreFabrication) => {
        // Convert date string to Date object for the datepicker
        if (ordreFabrication.date) {
          ordreFabrication.date = new Date(ordreFabrication.date);
        }
        this.ordreFabricationForm.patchValue(ordreFabrication);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement de l\'ordre de fabrication';
        this.loading = false;
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.ordreFabricationForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const ordreFabricationData = this.ordreFabricationForm.value;

    if (this.isEditMode && this.ordreFabricationId) {
      // Update existing ordre de fabrication
      this.http.put(`http://localhost:8080/api/ordres-fabrication/${this.ordreFabricationId}`, ordreFabricationData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/ordres-fabrication']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la modification de l\'ordre de fabrication';
          console.error(error);
        }
      );
    } else {
      // Create new ordre de fabrication
      this.http.post('http://localhost:8080/api/ordres-fabrication', ordreFabricationData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/ordres-fabrication']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la création de l\'ordre de fabrication';
          console.error(error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/ordres-fabrication']);
  }
}
