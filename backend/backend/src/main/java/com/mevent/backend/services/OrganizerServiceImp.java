package com.mevent.backend.services;

import com.mevent.backend.api.response.EventResponse;
import com.mevent.backend.api.response.OrganizerEventsResponse;
import com.mevent.backend.api.response.OrganizerResponse;
import com.mevent.backend.dto.OrganizerDto;
import com.mevent.backend.models.*;
import com.mevent.backend.repositories.*;
import com.mevent.backend.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class OrganizerServiceImp implements OrganizerService{

    UserRepository userRepository;
    OrganizerRepository organizerRepository;
    JwtUtils jwtUtils;
    FollowersRepository followersRepository;
    EventRepository eventRepository;
    LikesRepository likesRepository;
    TicketRepository ticketRepository;
    CategoryRepository categoryRepository;
    OrderRepository orderRepository;

    public boolean isOrganizerFollowed(Long organizerId) {
        if (jwtUtils.isUserAuthenticated()) {
            return followersRepository
                    .existsByUserUserIdAndOrganizerOrganizerId(
                            jwtUtils.getUserIdFromToken(),
                            organizerId
                    );
        }
        else {
            return false;
        }
    }

    public boolean isUserLiked(Long eventId){
        if (jwtUtils.isUserAuthenticated()) {
            return likesRepository
                    .existsByUserIdAndEventId(
                            jwtUtils.getUserIdFromToken(),
                            eventId
                    );
        }else {
            return false;
        }
    }

    @Override
    public Organizer createOrganizer(OrganizerDto organizerDto) {

        try{
            User user = userRepository
                    .findById(jwtUtils.getUserIdFromToken())
                    .orElseThrow();

            Organizer newOrganizer = new Organizer(
                    organizerDto.getOrganizerName(),
                    organizerDto.getDescription(),
                    user
            );

            organizerRepository.save(newOrganizer);
            return newOrganizer;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public OrganizerResponse getOrganizer(Long organizerId) {
        Organizer organizer = organizerRepository
                .findById(organizerId)
                .orElseThrow();

        List<Event> organizerEvents = eventRepository
                .findAllByOrganizerOrganizerId(organizerId);

        List<EventResponse> responses = new ArrayList<>();

        for (Event e: organizerEvents){
            Category category = categoryRepository.findById(e.getCategory().getCategoryId()).orElseThrow();

            EventResponse response = new EventResponse(
                    e.getEventId(),
                    e.getOrganizer().getOrganizerId(),
                    e.getEventName(),
                    e.getCoverImg(),
                    null,
                    e.getStartDate(),
                    e.getEndDate(),
                    ticketRepository.findByEventId(e.getEventId()),
                    category.getCategoryName(),
                    isUserLiked(e.getEventId()) ? "1" : "0"
            );
            responses.add(response);
        }

        int numberOfFollowers = followersRepository
                .findAllByOrganizerOrganizerId(organizerId)
                .size();

        return new OrganizerResponse(
                organizer.getOrganizerId(),
                organizer.getOrganizerName(),
                organizer.getDescription(),
                organizer.getProfileImg(),
                responses,
                numberOfFollowers,
                isOrganizerFollowed(organizerId) ? "1" : "0"
        );
    }

    @Override
    public Long getOrganizerIdByUserId(Long userId) {
        if (organizerRepository.existsByUserUserId(userId)){
            Organizer organizer = organizerRepository.findByUserUserId(userId).orElseThrow();
            return organizer.getOrganizerId();
        }else{
            return null;
        }

    }

    @Override
    public List<OrganizerResponse> getOrganizers() {

        List<Organizer> organizers = organizerRepository.findAll();
        List<OrganizerResponse> responses = new ArrayList<>();


        Long loggedUserId = 0L;

        if (jwtUtils.isUserAuthenticated()) {
            loggedUserId = jwtUtils.getUserIdFromToken();
        }

        for (Organizer o: organizers){
            boolean isUserFollowed = false;

            int numberOfFollowers = followersRepository
                    .findAllByOrganizerOrganizerId(o.getOrganizerId())
                    .size();

            if (loggedUserId > 0){
                isUserFollowed = followersRepository
                        .existsByUserUserIdAndOrganizerOrganizerId(
                                loggedUserId,
                                o.getOrganizerId()
                        );
            }
            OrganizerResponse r = new OrganizerResponse(
                    o.getOrganizerId(),
                    o.getOrganizerName(),
                    o.getDescription(),
                    o.getProfileImg(),
                    null,
                    numberOfFollowers,
                    isUserFollowed ? "1" : "0"
            );

            responses.add(r);
        }

        return responses;
    }

    @Override
    public List<OrganizerResponse> getFollowedOrganizers() {
        List<OrganizerResponse> organizers = this.getOrganizers();
        List<OrganizerResponse> followedOrganizers = new ArrayList<>();

        for (OrganizerResponse o : organizers){
            if (o.getIsUserFollowed().equals("1")){
                followedOrganizers.add(o);
            }
        }
        return followedOrganizers;
    }

    @Override
    public List<OrganizerEventsResponse> getAllEvents(Long organizerId) {
        List<Event> organizerEvents = eventRepository
                .findAllByOrganizerOrganizerId(organizerId);
        List<OrganizerEventsResponse> responses = new ArrayList<>();


        for (Event event: organizerEvents) {
            Category category = categoryRepository.findById(event.getCategory().getCategoryId()).orElseThrow();
            List<Ticket> tickets = ticketRepository.findByEventId(event.getEventId());
            List<Order> orders = orderRepository.findAllByTicketTicketId(tickets.get(0).getTicketId());
            OrganizerEventsResponse response = new OrganizerEventsResponse(
                    event.getEventId(),
                    event.getEventName(),
                    event.getCoverImg(),
                    event.getStartDate(),
                    event.getEndDate(),
                    category.getCategoryName(),
                    tickets.get(0).getQuantity(),
                    orders.size(),
                    orders.size() * tickets.get(0).getPrice()
            );
            responses.add(response);
        }
        return responses;
    }
}
