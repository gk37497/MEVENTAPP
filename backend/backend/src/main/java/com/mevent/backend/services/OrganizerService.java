package com.mevent.backend.services;

import com.mevent.backend.api.response.OrganizerEventsResponse;
import com.mevent.backend.api.response.OrganizerResponse;
import com.mevent.backend.dto.OrganizerDto;
import com.mevent.backend.models.Organizer;

import java.util.List;

public interface OrganizerService {

    abstract Organizer createOrganizer(OrganizerDto organizerDto);

    abstract OrganizerResponse getOrganizer(Long organizerId);
    abstract Long getOrganizerIdByUserId(Long userId);
    abstract List<OrganizerResponse> getOrganizers();
    abstract List<OrganizerResponse> getFollowedOrganizers();

    abstract List<OrganizerEventsResponse> getAllEvents(Long organizerId);
}
