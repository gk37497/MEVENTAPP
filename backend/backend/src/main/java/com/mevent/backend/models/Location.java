package com.mevent.backend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Service
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long locationId;
    private String locationName;
    private Long directionX;
    private Long directionY;

    public Location(Long locationId, String locationName) {
        this.locationId = locationId;
        this.locationName = locationName;
    }
}
