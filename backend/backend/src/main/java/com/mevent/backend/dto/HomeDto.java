package com.mevent.backend.dto;


import com.mevent.backend.api.response.EventResponse;
import com.mevent.backend.api.response.OrganizerResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class HomeDto {

    private List<EventResponse> eventsByFollowers;
    private List<EventResponse> eventsByChosenCategories;
    private List<OrganizerResponse> organizers;
}
