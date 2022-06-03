package com.mevent.backend.api.response;

import com.mevent.backend.models.Ticket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrganizerEventsResponse {
    private Long eventId;
    private String eventName;
    private String coverImg;
    private Date startDate;
    private Date endDate;
    private String categoryName;
    private Integer ticketQuantity;
    private Integer leftTicketQuantity;
    private Integer payedTicketCash;
}
