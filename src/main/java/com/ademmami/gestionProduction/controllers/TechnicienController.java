package com.ademmami.gestionProduction.controllers;

import com.ademmami.gestionProduction.models.Technicien;
import com.ademmami.gestionProduction.services.TechnicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/techniciens")
public class TechnicienController {

    private final TechnicienService technicienService;

    @Autowired
    public TechnicienController(TechnicienService technicienService) {
        this.technicienService = technicienService;
    }

    @GetMapping
    public ResponseEntity<List<Technicien>> getAllTechniciens() {
        return ResponseEntity.ok(technicienService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technicien> getTechnicienById(@PathVariable Long id) {
        return technicienService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Technicien> createTechnicien(@RequestBody Technicien technicien) {
        return ResponseEntity.status(HttpStatus.CREATED).body(technicienService.save(technicien));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technicien> updateTechnicien(@PathVariable Long id, @RequestBody Technicien technicien) {
        return technicienService.getById(id)
                .map(existingTechnicien -> {
                    technicien.setId(id);
                    return ResponseEntity.ok(technicienService.save(technicien));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnicien(@PathVariable Long id) {
        return technicienService.getById(id)
                .map(technicien -> {
                    technicienService.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // New endpoint to assign technician to a machine
    @PostMapping("/{id}/assign-machine")
    public ResponseEntity<Technicien> assignToMachine(@PathVariable Long id, @RequestBody Map<String, Long> payload) {
        try {
            Long machineId = payload.get("machineId");
            if (machineId == null) {
                return ResponseEntity.badRequest().build();
            }
            
            Technicien updatedTechnicien = technicienService.assignToMachine(id, machineId);
            return ResponseEntity.ok(updatedTechnicien);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
