package com.mevent.backend.controllers;


import com.mevent.backend.api.response.EventResponse;
import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.EventDto;
import com.mevent.backend.dto.TicketDto;
import com.mevent.backend.models.*;
import com.mevent.backend.models.enums.EventStatus;
import com.mevent.backend.models.enums.EventType;
import com.mevent.backend.repositories.CategoryRepository;
import com.mevent.backend.repositories.EventRepository;
import com.mevent.backend.repositories.OrganizerRepository;
import com.mevent.backend.services.EventServiceImp;
import com.mevent.backend.services.OrderServiceImp;
import com.mevent.backend.services.TicketServiceImp;
import com.sipios.springsearch.anotation.SearchSpec;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/event")
@AllArgsConstructor
public class EventController {

    EventRepository eventRepository;
    CategoryRepository categoryRepository;
    OrganizerRepository organizerRepository;
    EventServiceImp eventServiceImp;
    TicketServiceImp ticketServiceImp;
    OrderServiceImp orderServiceImp;

    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@Valid @RequestBody EventDto eventDto){
        if(eventRepository.existsByEventName(eventDto.getEventName())){
            return ResponseEntity
                    .badRequest()
                    .body(
                            new MessageResponse(
                                    "Error: Event name is already in use !"
                            )
                    );
        }
        Category category =
                categoryRepository
                    .findById(eventDto.getCategoryId())
                    .orElseThrow();

        Organizer organizer =
                organizerRepository
                    .findById(eventDto.getOrganizerId())
                    .orElseThrow();

        Event event =
                new Event(
                        eventDto.getEventName(),
                        organizer,
                        category,
                        eventDto.getIsOnline() == 1 ? EventType.VENUE : EventType.ONLINE,
                        eventDto.getStartDate(),
                        eventDto.getEndDate(),
                        null,
                        null,
                        null,
                        EventStatus.ACTIVE
                );
        eventRepository.save(event);
        return ResponseEntity
                .ok()
                .body(new EventResponse(
                        event.getEventId(),
                        event.getOrganizer().getOrganizerId(),
                        event.getEventName(),
                        null,
                        null,
                        event.getStartDate(),
                        event.getEndDate(),
                        null,
                        category.getCategoryName(),
                        "0"
                ));
    }

    @GetMapping("/{eventId}")
    ResponseEntity<?> getEvent(@Valid @PathVariable("eventId") Long eventId){
        if (!eventRepository.existsById(eventId)){
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("empty"));
        }
        else{
            return ResponseEntity
                    .ok()
                    .body(
                            eventServiceImp.getEvent(eventId)
                    );
        }
    }

    @PostMapping("/ticket/create")
    public ResponseEntity<?> createTicket(@Valid @RequestBody TicketDto ticketDto){
        MessageResponse response = ticketServiceImp.createTicket(ticketDto);

        return ResponseEntity
                .ok()
                .body(response);
    }

    @GetMapping("/ticket/getAll")
    public ResponseEntity<?> getAllTicketsByUserId(){
        List<Order> orders = orderServiceImp.getAllOrders();

        return ResponseEntity
                .ok()
                .body(orders);
    }

    @GetMapping("/search")
    public ResponseEntity<List<EventResponse>> searchEvent(@SearchSpec Specification<Event> specs){
//        return new ResponseEntity<>(eventRepository.findAll(Specification.where(specs)), HttpStatus.OK);
        return ResponseEntity
                .ok()
                .body(eventServiceImp.search(specs));
    }
}
