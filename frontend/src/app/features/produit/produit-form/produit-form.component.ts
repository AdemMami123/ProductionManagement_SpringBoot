import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
    RouterModule
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
    private router: Router
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
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      const produit = {
        id: id,
        nom: 'Produit ' + id,
        type: 'Type A',
        stock: 100,
        fournisseur: 'Fournisseur X'
      };
      
      this.produitForm.patchValue(produit);
      this.loading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.produitForm.invalid) {
      return;
    }

    this.submitLoading = true;
    const produitData = this.produitForm.value;
    
    // Simulate API call - will be replaced with actual HTTP request
    setTimeout(() => {
      console.log('Produit saved:', produitData);
      this.submitLoading = false;
      this.router.navigate(['/produits']);
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/produits']);
  }
}
