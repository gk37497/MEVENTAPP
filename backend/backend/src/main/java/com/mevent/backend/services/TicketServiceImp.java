package com.mevent.backend.services;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.TicketDto;
import com.mevent.backend.models.Order;
import com.mevent.backend.models.Ticket;
import com.mevent.backend.models.enums.TicketType;
import com.mevent.backend.repositories.EventRepository;
import com.mevent.backend.repositories.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TicketServiceImp implements TicketService{

    EventRepository eventRepository;
    TicketRepository ticketRepository;

    @Override
    public MessageResponse createTicket(TicketDto ticketDto) {

        try{
            Ticket ticket = new Ticket(
                    ticketDto.getEventId(),
                    TicketType.VIP,
                    ticketDto.getPrice(),
                    ticketDto.getQuantity()
            );
            ticketRepository.save(ticket);
            return new MessageResponse("ticket created");
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse("Error, while create ticket");
        }
    }
}
