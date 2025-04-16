import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-produit-form',
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
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss']
})
export class ProduitFormComponent implements OnInit {
  produitForm!: FormGroup;
  isEditMode = false;
  produitId?: number;
  loading = false;
  submitLoading = false;
  errorMessage: string | null = null;

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
        this.produitId = +params['id'];
        this.loadProduit(this.produitId);
      }
    });
  }

  initForm(): void {
    this.produitForm = this.fb.group({
      nom: ['', [Validators.required]],
      type: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      fournisseur: ['', [Validators.required]]
    });
  }

  loadProduit(id: number): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/produits/${id}`).subscribe(
      (produit) => {
        this.produitForm.patchValue(produit);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement du produit';
        this.loading = false;
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.produitForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const produitData = this.produitForm.value;

    if (this.isEditMode && this.produitId) {
      // Update existing product
      this.http.put(`http://localhost:8080/api/produits/${this.produitId}`, produitData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/produits']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la modification du produit';
          console.error(error);
        }
      );
    } else {
      // Create new product
      this.http.post('http://localhost:8080/api/produits', produitData).subscribe(
        () => {
          this.submitLoading = false;
          this.router.navigate(['/produits']);
        },
        error => {
          this.submitLoading = false;
          this.errorMessage = 'Erreur lors de la création du produit';
          console.error(error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/produits']);
  }
}
