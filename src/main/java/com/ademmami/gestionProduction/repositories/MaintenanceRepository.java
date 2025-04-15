package com.ademmami.gestionProduction.repositories;

import com.ademmami.gestionProduction.models.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {
    // You can add custom query methods here if needed
}
