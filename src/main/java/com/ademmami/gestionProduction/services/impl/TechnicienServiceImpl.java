package com.ademmami.gestionProduction.services.impl;

import com.ademmami.gestionProduction.models.Machine;
import com.ademmami.gestionProduction.models.Technicien;
import com.ademmami.gestionProduction.repositories.MachineRepository;
import com.ademmami.gestionProduction.repositories.TechnicienRepository;
import com.ademmami.gestionProduction.services.TechnicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TechnicienServiceImpl implements TechnicienService {

    private final TechnicienRepository technicienRepository;
    private final MachineRepository machineRepository;

    @Autowired
    public TechnicienServiceImpl(TechnicienRepository technicienRepository, MachineRepository machineRepository) {
        this.technicienRepository = technicienRepository;
        this.machineRepository = machineRepository;
    }

    @Override
    public List<Technicien> getAll() {
        return technicienRepository.findAll();
    }

    @Override
    public Optional<Technicien> getById(Long id) {
        return technicienRepository.findById(id);
    }

    @Override
    public Technicien save(Technicien technicien) {
        return technicienRepository.save(technicien);
    }

    @Override
    public void deleteById(Long id) {
        technicienRepository.deleteById(id);
    }
    
    @Override
    public Technicien assignToMachine(Long technicienId, Long machineId) {
        Technicien technicien = technicienRepository.findById(technicienId)
                .orElseThrow(() -> new RuntimeException("Technicien non trouvé avec l'id: " + technicienId));
                
        Machine machine = machineRepository.findById(machineId)
                .orElseThrow(() -> new RuntimeException("Machine non trouvée avec l'id: " + machineId));
                
        technicien.setMachineAssignee(machine);
        return technicienRepository.save(technicien);
    }
}
