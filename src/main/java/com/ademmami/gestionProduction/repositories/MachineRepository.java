package com.ademmami.gestionProduction.repositories;

import com.ademmami.gestionProduction.models.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {
}
