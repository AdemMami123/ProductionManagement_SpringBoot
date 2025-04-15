package com.ademmami.gestionProduction.services;

import com.ademmami.gestionProduction.models.Produit;
import java.util.List;
import java.util.Optional;

public interface ProduitService {
    List<Produit> getAll();
    Optional<Produit> getById(Long id);
    Produit save(Produit produit);
    void deleteById(Long id);
}
