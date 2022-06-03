package com.mevent.backend.api.response;


import com.mevent.backend.models.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProfileResponse {

    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String profileImg;
    private List<EventResponse> likedEvents;
    private List<Order> tickets;
    private List<OrganizerResponse> followedOrganizers;
}
