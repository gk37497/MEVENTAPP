package com.mevent.backend.services;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.api.response.ProfileResponse;

public interface UserService {

    abstract MessageResponse followOrganizer(Long organizerId);
    abstract MessageResponse unfollowOrganizer(Long organizerId);

    abstract MessageResponse likeEvent(Long eventId);
    abstract MessageResponse unlikeEvent(Long eventId);

    abstract ProfileResponse getProfile();
}
