package com.mevent.backend.services;

import com.mevent.backend.api.response.EventResponse;
import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.EventDto;
import com.mevent.backend.models.Event;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface EventService {
    abstract MessageResponse createEvent(EventDto eventDto);
    abstract boolean isEventLiked(Long userId, Long eventId);
    abstract EventResponse getEvent(Long eventId);
    abstract List<EventResponse> getEvents();
    abstract List<EventResponse> getEventsByFollowers();
    abstract List<EventResponse> getEventsByChosenCategories();
    abstract List<EventResponse> getLikedEvents();
    abstract List<EventResponse> search(Specification<Event> specification);
}
