package com.mevent.backend.services;

import com.mevent.backend.api.response.EventResponse;
import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.EventDto;
import com.mevent.backend.models.Category;
import com.mevent.backend.models.ChosenCategories;
import com.mevent.backend.models.Event;
import com.mevent.backend.models.Followers;
import com.mevent.backend.repositories.*;
import com.mevent.backend.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class EventServiceImp implements EventService{

    LikesRepository likesRepository;
    EventRepository eventRepository;
    FollowersRepository followersRepository;
    TicketRepository ticketRepository;
    JwtUtils jwtUtils;
    ChoseCategoriesRepository choseCategoriesRepository;
    CategoryRepository categoryRepository;

    @Override
    public MessageResponse createEvent(EventDto eventDto) {
        return null;
    }

    @Override
    public boolean isEventLiked(Long eventId, Long userId) {
        return likesRepository
                .existsByUserIdAndEventId(
                        userId,
                        eventId
                );
    }

    @Override
    public EventResponse getEvent(Long eventId) {
        Event event = eventRepository
                .findById(eventId)
                .orElseThrow();
        Category category = categoryRepository.findById(event.getCategory().getCategoryId()).orElseThrow();
        return new EventResponse(
                event.getEventId(),
                event.getOrganizer().getOrganizerId(),
                event.getEventName(),
                event.getCoverImg(),
                null,
                event.getStartDate(),
                event.getEndDate(),
                ticketRepository.findByEventId( event.getEventId()),
                category.getCategoryName(),
                isEventLiked(
                        eventId,
                        jwtUtils.getUserIdFromToken()) ? "1" : "0"

        );
    }
    @Override
    public List<EventResponse> getEvents() {
        List<Event> events = eventRepository.findAll();
        List<EventResponse> eventResponses = new ArrayList<>();

        Long loggedUserId = 0L;

        if (jwtUtils.isUserAuthenticated()) {
            loggedUserId = jwtUtils.getUserIdFromToken();
        }
        for (Event e : events){
            boolean isUserLiked = false;

            if (loggedUserId > 0){
                isUserLiked = likesRepository
                        .existsByUserIdAndEventId(
                                loggedUserId,
                                e.getEventId()
                        );
            }
            Category category = categoryRepository.findById(e.getCategory().getCategoryId()).orElseThrow();

            EventResponse r = new EventResponse(
                    e.getEventId(),
                    e.getOrganizer().getOrganizerId(),
                    e.getEventName(),
                    e.getCoverImg(),
                    null,
                    e.getStartDate(),
                    e.getEndDate(),
                    ticketRepository.findByEventId(e.getEventId()),
                    category.getCategoryName(),
                    isUserLiked ? "1" : "0"
            );
            eventResponses.add(r);
        }

        return eventResponses;
    }
    @Override
    public List<EventResponse> getEventsByFollowers() {
        if (!jwtUtils.isUserAuthenticated()) {
            return null;
        }else{
            Long loggedUserId = jwtUtils.getUserIdFromToken();
            List<Followers> followedData = followersRepository
                    .findAllByUserUserId(loggedUserId);
            List<Event> eventsByFollowedOrganizers = new ArrayList<>();

            for(Followers followers: followedData){
                eventsByFollowedOrganizers
                        .addAll(
                                eventRepository
                                        .findAllByOrganizerOrganizerId(
                                                followers
                                                        .getOrganizer()
                                                        .getOrganizerId()
                                        )
                        );
            }
            List<EventResponse> responses = new ArrayList<>();

            for ( Event e : eventsByFollowedOrganizers){
                Category category = categoryRepository.findById(e.getCategory().getCategoryId()).orElseThrow();

                EventResponse eventResponse = new EventResponse(
                        e.getEventId(),
                        e.getOrganizer().getOrganizerId(),
                        e.getEventName(),
                        e.getCoverImg(),
                        null,
                        e.getStartDate(),
                        e.getEndDate(),
                        ticketRepository.findByEventId(e.getEventId()),
                        category.getCategoryName(),
                        isEventLiked(
                                loggedUserId
                                ,e.getEventId()
                        ) ? "1" : "0"

                );
                responses.add(eventResponse);
            }
            return responses;
        }
    }

    @Override
    public List<EventResponse> getEventsByChosenCategories() {
        List<EventResponse> chosenCategoriesEvents = new ArrayList<>();
        List<ChosenCategories> chosenCategories = choseCategoriesRepository.findAllByUserId(jwtUtils.getUserIdFromToken());
        List<Long> chosenCategoriesIds = new ArrayList<>();
        List<Event> events = new ArrayList<>();
        Long loggedUserId = jwtUtils.getUserIdFromToken();

        for (ChosenCategories c: chosenCategories ){
            chosenCategoriesIds.add(c.getCategoryId());
        }

        for (Long l: chosenCategoriesIds){
            events.addAll(eventRepository.findAllByCategoryCategoryId(l));
        }

        for (Event e: events){
            Category category = categoryRepository.findById(e.getCategory().getCategoryId()).orElseThrow();

            EventResponse eventResponse = new EventResponse(
                    e.getEventId(),
                    e.getOrganizer().getOrganizerId(),
                    e.getEventName(),
                    e.getCoverImg(),
                    null,
                    e.getStartDate(),
                    e.getEndDate(),
                    ticketRepository.findByEventId(e.getEventId()),
                    category.getCategoryName(),
                    isEventLiked(
                            loggedUserId
                            ,e.getEventId()
                    ) ? "1" : "0"

            );
            chosenCategoriesEvents.add(eventResponse);
        }

        return chosenCategoriesEvents;
    }

    @Override
    public List<EventResponse> getLikedEvents() {
        List<EventResponse> events = this.getEvents();
        List<EventResponse> likedEvents = new ArrayList<>();

        for (EventResponse e :events){
            if (e.getLikeFlag().equals("1")){
                likedEvents.add(e);
            }
        }
        return likedEvents;
    }

    @Override
    public List<EventResponse> search(Specification<Event> specification) {
        List<Event> events = eventRepository.findAll(Specification.where(specification));
        Long loggedUserId = jwtUtils.getUserIdFromToken();
        List<EventResponse> responses = new ArrayList<>();

        for (Event e: events){
            Category category = categoryRepository.findById(e.getCategory().getCategoryId()).orElseThrow();

            EventResponse eventResponse = new EventResponse(
                    e.getEventId(),
                    e.getOrganizer().getOrganizerId(),
                    e.getEventName(),
                    e.getCoverImg(),
                    null,
                    e.getStartDate(),
                    e.getEndDate(),
                    ticketRepository.findByEventId(e.getEventId()),
                    category.getCategoryName(),
                    isEventLiked(
                            loggedUserId
                            ,e.getEventId()
                    ) ? "1" : "0"

            );
            responses.add(eventResponse);
        }
        return responses;
    }

}
