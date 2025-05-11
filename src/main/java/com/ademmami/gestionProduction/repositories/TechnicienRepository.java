package com.ademmami.gestionProduction.repositories;

import com.ademmami.gestionProduction.models.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {
}
