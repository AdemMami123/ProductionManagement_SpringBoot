package com.ademmami.gestionProduction.services;

import com.ademmami.gestionProduction.models.Machine;
import java.util.List;
import java.util.Optional;

public interface MachineService {
    List<Machine> getAll();
    Optional<Machine> getById(Long id);
    Machine save(Machine machine);
    void deleteById(Long id);
}
