package com.ademmami.gestionProduction.services;

import com.ademmami.gestionProduction.models.Maintenance;
import java.util.List;
import java.util.Optional;

public interface MaintenanceService {
    List<Maintenance> getAll();
    Optional<Maintenance> getById(Long id);
    Maintenance save(Maintenance maintenance);
    void deleteById(Long id);
}
