package com.ademmami.gestionProduction.services.impl;

import com.ademmami.gestionProduction.models.Maintenance;
import com.ademmami.gestionProduction.repositories.MaintenanceRepository;
import com.ademmami.gestionProduction.services.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;

    @Autowired
    public MaintenanceServiceImpl(MaintenanceRepository maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    @Override
    public List<Maintenance> getAll() {
        return maintenanceRepository.findAll();
    }

    @Override
    public Optional<Maintenance> getById(Long id) {
        return maintenanceRepository.findById(id);
    }

    @Override
    public Maintenance save(Maintenance maintenance) {
        return maintenanceRepository.save(maintenance);
    }

    @Override
    public void deleteById(Long id) {
        maintenanceRepository.deleteById(id);
    }
}
