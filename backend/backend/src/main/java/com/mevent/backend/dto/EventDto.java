package com.mevent.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class EventDto {
    private String eventName;
    private Long organizerId;
    private Long categoryId;
    private Date startDate;
    private Date endDate;
    private Integer isOnline;
}
