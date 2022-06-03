package com.mevent.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class OrderDto {

    private Long ticketId;
    private Integer numberOfTickets;

}
