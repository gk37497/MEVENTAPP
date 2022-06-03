package com.mevent.backend.controllers;


import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.OrganizerDto;
import com.mevent.backend.models.Organizer;
import com.mevent.backend.repositories.OrganizerRepository;
import com.mevent.backend.repositories.UserRepository;
import com.mevent.backend.security.jwt.JwtUtils;
import com.mevent.backend.services.OrganizerServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/organizer")
public class OrganizerController {

    @Autowired
    OrganizerRepository organizerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    OrganizerServiceImp organizerServiceImp;

    @PostMapping("/create")
    public ResponseEntity<?> createOrganizer(@Valid @RequestBody OrganizerDto organizerDto) {

        if(organizerRepository.existsByOrganizerName(organizerDto.getOrganizerName())){
            return ResponseEntity
                    .badRequest()
                    .body(
                            new MessageResponse(
                                    "Error: Organizer name is already in use!"
                            )
                    );
        }
        Organizer result =  organizerServiceImp.createOrganizer(organizerDto);
        return ResponseEntity
                .ok().body(result);
    }
    @GetMapping("/{organizerId}")
    ResponseEntity<?> getOrganizer(@Valid @PathVariable("organizerId") Long organizerId){
        if (!organizerRepository.existsById(organizerId)){
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("empty"));
        }
        else{
            return ResponseEntity
                    .ok()
                    .body(
                            organizerServiceImp.getOrganizer(organizerId)
                    );
        }
    }

    @GetMapping("/getAll/{organizerId}")
    ResponseEntity<?> getOrganizerEvents(@Valid @PathVariable("organizerId") Long organizerId){
        if (!organizerRepository.existsById(organizerId)){
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("empty"));
        }
        else{
            return ResponseEntity
                    .ok()
                    .body(
                            organizerServiceImp.getAllEvents(organizerId)
                    );
        }
    }
}
