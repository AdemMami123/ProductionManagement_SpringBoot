package com.ademmami.gestionProduction.services.impl;

import com.ademmami.gestionProduction.models.OrdreFabrication;
import com.ademmami.gestionProduction.models.StatutOrdreFabrication;
import com.ademmami.gestionProduction.repositories.OrdreFabricationRepository;
import com.ademmami.gestionProduction.services.OrdreFabricationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdreFabricationServiceImpl implements OrdreFabricationService {

    private final OrdreFabricationRepository ordreFabricationRepository;

    @Autowired
    public OrdreFabricationServiceImpl(OrdreFabricationRepository ordreFabricationRepository) {
        this.ordreFabricationRepository = ordreFabricationRepository;
    }

    @Override
    public List<OrdreFabrication> getAll() {
        return ordreFabricationRepository.findAll();
    }

    @Override
    public Optional<OrdreFabrication> getById(Long id) {
        return ordreFabricationRepository.findById(id);
    }

    @Override
    public OrdreFabrication save(OrdreFabrication ordreFabrication) {
        return ordreFabricationRepository.save(ordreFabrication);
    }

    @Override
    public void deleteById(Long id) {
        ordreFabricationRepository.deleteById(id);
    }
    
    @Override
    public OrdreFabrication updateStatus(Long id, StatutOrdreFabrication statut) {
        return ordreFabricationRepository.findById(id)
                .map(ordre -> {
                    ordre.setStatut(statut);
                    return ordreFabricationRepository.save(ordre);
                })
                .orElseThrow(() -> new RuntimeException("Ordre de fabrication non trouvé avec l'id: " + id));
    }
}
