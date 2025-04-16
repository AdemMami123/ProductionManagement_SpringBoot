import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produit-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSelectModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Modifier Produit</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="loading" class="loading-spinner">
            <mat-spinner></mat-spinner>
          </div>
          
          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          
          <form *ngIf="!loading && produitForm" [formGroup]="produitForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="nom" required>
              <mat-error *ngIf="produitForm.get('nom')?.invalid">Nom est obligatoire</mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Type</mat-label>
              <input matInput formControlName="type" required>
              <mat-error *ngIf="produitForm.get('type')?.invalid">Type est obligatoire</mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Stock</mat-label>
              <input matInput type="number" formControlName="stock" required>
              <mat-error *ngIf="produitForm.get('stock')?.invalid">Stock valide est obligatoire</mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Fournisseur</mat-label>
              <input matInput formControlName="fournisseur">
            </mat-form-field>
            
            <div class="button-row">
              <button mat-raised-button color="primary" type="submit" [disabled]="produitForm.invalid || loading">
                Enregistrer
              </button>
              <button mat-button type="button" (click)="cancel()">Annuler</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 0 20px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .loading-spinner {
      display: flex;
      justify-content: center;
      margin: 30px 0;
    }
    .error-message {
      color: red;
      margin: 20px 0;
    }
    .button-row {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
  `]
})
export class ProduitEditComponent implements OnInit {
  produitForm: FormGroup;
  produitId: number;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      fournisseur: ['']
    });
    this.produitId = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.produitId = +params['id'];
      this.loadProduit(this.produitId);
    });
  }

  loadProduit(id: number): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/produits/${id}`).subscribe(
      (produit) => {
        this.produitForm.patchValue({
          nom: produit.nom,
          type: produit.type,
          stock: produit.stock,
          fournisseur: produit.fournisseur
        });
        this.loading = false;
      },
      (error) => {
        console.error('Error loading produit:', error);
        this.errorMessage = 'Erreur lors du chargement du produit.';
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      this.loading = true;
      this.http.put(`http://localhost:8080/api/produits/${this.produitId}`, this.produitForm.value).subscribe(
        () => {
          console.log('Produit updated successfully');
          this.router.navigate(['/produits']);
        },
        (error) => {
          console.error('Error updating produit:', error);
          this.errorMessage = 'Erreur lors de la mise à jour du produit.';
          this.loading = false;
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/produits']);
  }
}
