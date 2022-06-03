package com.mevent.backend.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class TicketDto {
    private Long eventId;
    private Integer price;
    private Integer quantity;

    public TicketDto(
            Long eventId,
            Integer price,
            Integer quantity
    ) {
        this.eventId = eventId;
        this.price = price;
        this.quantity = quantity;
    }
}
