package com.ademmami.gestionProduction.repositories;

import com.ademmami.gestionProduction.models.OrdreFabrication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {
    // You can add custom query methods here if needed
}
