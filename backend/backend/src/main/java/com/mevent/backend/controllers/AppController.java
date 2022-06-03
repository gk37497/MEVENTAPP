package com.mevent.backend.controllers;

import com.mevent.backend.api.response.EventResponse;
import com.mevent.backend.api.response.OrganizerResponse;
import com.mevent.backend.dto.HomeDto;
import com.mevent.backend.models.Category;
import com.mevent.backend.services.AppServiceImp;
import com.mevent.backend.services.EventServiceImp;
import com.mevent.backend.services.OrganizerServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/app")
@AllArgsConstructor
public class AppController {


    OrganizerServiceImp organizerServiceImp;
    EventServiceImp eventServiceImp;
    AppServiceImp appServiceImp;


    @GetMapping("/home")
    public ResponseEntity<?> getHome(){
        HomeDto homeDto = new HomeDto(
                eventServiceImp.getEventsByFollowers(),
                eventServiceImp.getEventsByChosenCategories(),
                organizerServiceImp.getOrganizers()
        );

        return ResponseEntity
                .ok()
                .body(homeDto);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(){
        List<Category> response = appServiceImp.getCategories();
        return ResponseEntity
                .ok()
                .body(response);
    }

    @GetMapping("/events")
    public ResponseEntity<?> getEvents(){
        List<EventResponse> response = eventServiceImp.getEvents();
        return ResponseEntity
                .ok()
                .body(response);
    }

    @GetMapping("/organizers")
    public ResponseEntity<?> getOrganizers(){
        List<OrganizerResponse> response = organizerServiceImp.getOrganizers();
        return ResponseEntity
                .ok()
                .body(response);
    }

}
