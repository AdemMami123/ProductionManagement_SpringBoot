package com.ademmami.gestionProduction.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    
    @Enumerated(EnumType.STRING)
    private EtatMachine etat;

    private LocalDate maintenanceProchaine;
}

enum EtatMachine {
    EN_SERVICE, EN_PANNE, EN_MAINTENANCE
}
