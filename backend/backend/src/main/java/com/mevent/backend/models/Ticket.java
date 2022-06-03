package com.mevent.backend.models;


import com.mevent.backend.models.enums.TicketType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long ticketId;

    private Long eventId;

    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    private Integer price;
    private Integer quantity;

    public Ticket(
            Long eventId,
            TicketType ticketType,
            Integer price,
            Integer quantity
    ) {
        this.eventId = eventId;
        this.ticketType = ticketType;
        this.price = price;
        this.quantity = quantity;
    }
}
