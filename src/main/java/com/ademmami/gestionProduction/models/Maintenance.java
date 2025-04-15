package com.ademmami.gestionProduction.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "machine_id", nullable = false)
    private Machine machine;

    @ManyToOne
    @JoinColumn(name = "technicien_id", nullable = false)
    private Technicien technicien;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private TypeMaintenance type;
}
