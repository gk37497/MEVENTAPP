package com.mevent.backend.api.response;

import com.mevent.backend.models.Ticket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class EventResponse {

    private Long eventId;
    private Long organizerId;
    private String eventName;
    private String coverImg;
    private Long locationId;
    private Date startDate;
    private Date endDate;
    private List<Ticket> tickets;
    private String categoryName;

    @Size(max=1)
    private String likeFlag;
}
