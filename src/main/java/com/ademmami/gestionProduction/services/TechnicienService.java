package com.ademmami.gestionProduction.services;

import com.ademmami.gestionProduction.models.Technicien;
import java.util.List;
import java.util.Optional;

public interface TechnicienService {
    List<Technicien> getAll();
    Optional<Technicien> getById(Long id);
    Technicien save(Technicien technicien);
    void deleteById(Long id);
    
    // New method to assign technician to a machine
    Technicien assignToMachine(Long technicienId, Long machineId);
}
