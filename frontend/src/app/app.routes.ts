import { Routes } from '@angular/router';
import { ProduitListComponent } from './features/produit/produit-list/produit-list.component';
import { ProduitEditComponent } from './features/produit/produit-edit/produit-edit.component';

export const routes: Routes = [
  { 
    path: 'produits', 
    component: ProduitListComponent
  },
  { 
    path: 'produits/edit/:id', 
    component: ProduitEditComponent
  },
  { 
    path: 'produits/new', 
    loadComponent: () => import('./features/produit/produit-form/produit-form.component').then(m => m.ProduitFormComponent)
  },
  { 
    path: 'produits/:id', 
    loadComponent: () => import('./features/produit/produit-form/produit-form.component').then(m => m.ProduitFormComponent)
  },
  { 
    path: 'machines', 
    loadComponent: () => import('./features/machine/machine-list/machine-list.component').then(m => m.MachineListComponent)
  },
  { 
    path: 'machines/new', 
    loadComponent: () => import('./features/machine/machine-form/machine-form.component').then(m => m.MachineFormComponent)
  },
  { 
    path: 'machines/:id', 
    loadComponent: () => import('./features/machine/machine-form/machine-form.component').then(m => m.MachineFormComponent)
  },
  { 
    path: 'techniciens', 
    loadComponent: () => import('./features/technicien/technicien-list/technicien-list.component').then(m => m.TechnicienListComponent)
  },
  { 
    path: 'techniciens/new', 
    loadComponent: () => import('./features/technicien/technicien-form/technicien-form.component').then(m => m.TechnicienFormComponent)
  },
  { 
    path: 'techniciens/:id', 
    loadComponent: () => import('./features/technicien/technicien-form/technicien-form.component').then(m => m.TechnicienFormComponent)
  },
  { 
    path: 'maintenances', 
    loadComponent: () => import('./features/maintenance/maintenance-list/maintenance-list.component').then(m => m.MaintenanceListComponent)
  },
  { 
    path: 'maintenances/new', 
    loadComponent: () => import('./features/maintenance/maintenance-form/maintenance-form.component').then(m => m.MaintenanceFormComponent)
  },
  { 
    path: 'maintenances/:id', 
    loadComponent: () => import('./features/maintenance/maintenance-form/maintenance-form.component').then(m => m.MaintenanceFormComponent)
  },
  { 
    path: 'ordres-fabrication', 
    loadComponent: () => import('./features/ordre-fabrication/ordre-fabrication-list/ordre-fabrication-list.component').then(m => m.OrdreFabricationListComponent)
  },
  
  { 
    path: '', 
    redirectTo: '/produits', 
    pathMatch: 'full' 
  }
];
