package com.ademmami.gestionProduction.services;

import com.ademmami.gestionProduction.models.OrdreFabrication;
import com.ademmami.gestionProduction.models.StatutOrdreFabrication;

import java.util.List;
import java.util.Optional;

public interface OrdreFabricationService {
    List<OrdreFabrication> getAll();
    Optional<OrdreFabrication> getById(Long id);
    OrdreFabrication save(OrdreFabrication ordreFabrication);
    void deleteById(Long id);
    
    // New method to update status
    OrdreFabrication updateStatus(Long id, StatutOrdreFabrication statut);
}
