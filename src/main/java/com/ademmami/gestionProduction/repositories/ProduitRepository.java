package com.ademmami.gestionProduction.repositories;

import com.ademmami.gestionProduction.models.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    // You can add custom query methods here if needed
}
