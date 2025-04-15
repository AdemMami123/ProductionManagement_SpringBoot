package com.ademmami.gestionProduction.services.impl;

import com.ademmami.gestionProduction.models.Machine;
import com.ademmami.gestionProduction.repositories.MachineRepository;
import com.ademmami.gestionProduction.services.MachineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MachineServiceImpl implements MachineService {

    private final MachineRepository machineRepository;

    @Autowired
    public MachineServiceImpl(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    @Override
    public List<Machine> getAll() {
        return machineRepository.findAll();
    }

    @Override
    public Optional<Machine> getById(Long id) {
        return machineRepository.findById(id);
    }

    @Override
    public Machine save(Machine machine) {
        return machineRepository.save(machine);
    }

    @Override
    public void deleteById(Long id) {
        machineRepository.deleteById(id);
    }
}
