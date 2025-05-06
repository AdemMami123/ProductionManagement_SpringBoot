package com.ademmami.gestionProduction.controllers;

import com.ademmami.gestionProduction.models.OrdreFabrication;
import com.ademmami.gestionProduction.models.StatutOrdreFabrication;
import com.ademmami.gestionProduction.services.OrdreFabricationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ordres-fabrication")
public class OrdreFabricationController {

    private final OrdreFabricationService ordreFabricationService;

    @Autowired
    public OrdreFabricationController(OrdreFabricationService ordreFabricationService) {
        this.ordreFabricationService = ordreFabricationService;
    }

    @GetMapping
    public ResponseEntity<List<OrdreFabrication>> getAllOrdresFabrication() {
        return ResponseEntity.ok(ordreFabricationService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdreFabrication> getOrdreFabricationById(@PathVariable Long id) {
        return ordreFabricationService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<OrdreFabrication> createOrdreFabrication(@RequestBody OrdreFabrication ordreFabrication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ordreFabricationService.save(ordreFabrication));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdreFabrication> updateOrdreFabrication(@PathVariable Long id, @RequestBody OrdreFabrication ordreFabrication) {
        return ordreFabricationService.getById(id)
                .map(existingOrdreFabrication -> {
                    ordreFabrication.setId(id);
                    return ResponseEntity.ok(ordreFabricationService.save(ordreFabrication));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdreFabrication(@PathVariable Long id) {
        return ordreFabricationService.getById(id)
                .map(ordreFabrication -> {
                    ordreFabricationService.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // New endpoint to update status
    @PutMapping("/{id}/status")
    public ResponseEntity<OrdreFabrication> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        try {
            String statusValue = statusMap.get("status");
            if (statusValue == null) {
                return ResponseEntity.badRequest().build();
            }
            
            StatutOrdreFabrication statut = StatutOrdreFabrication.valueOf(statusValue.toUpperCase());
            OrdreFabrication updatedOrdre = ordreFabricationService.updateStatus(id, statut);
            return ResponseEntity.ok(updatedOrdre);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
