package com.mevent.backend.services;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.TicketDto;
import com.mevent.backend.models.Ticket;

import java.util.List;

public interface TicketService {

    abstract MessageResponse createTicket(TicketDto ticketDto);
}
