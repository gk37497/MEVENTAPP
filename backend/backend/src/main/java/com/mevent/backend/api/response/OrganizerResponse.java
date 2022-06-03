package com.mevent.backend.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrganizerResponse {

    private Long organizerId;
    private String organizerName;
    private String description;
    private String profileImg;
    private List<EventResponse> organizerEvents;
    private Integer numberOfFollowers;
    @Size(max = 1)
    private String isUserFollowed;
}
