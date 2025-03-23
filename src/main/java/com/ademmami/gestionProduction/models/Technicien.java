package com.ademmami.gestionProduction.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Technicien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String compétences;

    @ManyToOne
    @JoinColumn(name = "machine_id")
    private Machine machineAssignee;
}
