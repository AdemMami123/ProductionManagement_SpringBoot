package com.ademmami.gestionProduction.services.impl;

import com.ademmami.gestionProduction.models.Produit;
import com.ademmami.gestionProduction.repositories.ProduitRepository;
import com.ademmami.gestionProduction.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitServiceImpl implements ProduitService {

    private final ProduitRepository produitRepository;

    @Autowired
    public ProduitServiceImpl(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Override
    public List<Produit> getAll() {
        return produitRepository.findAll();
    }

    @Override
    public Optional<Produit> getById(Long id) {
        return produitRepository.findById(id);
    }

    @Override
    public Produit save(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public void deleteById(Long id) {
        produitRepository.deleteById(id);
    }
}
