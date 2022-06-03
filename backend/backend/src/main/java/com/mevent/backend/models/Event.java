package com.mevent.backend.models;

import com.mevent.backend.models.enums.EventStatus;
import com.mevent.backend.models.enums.EventType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Table(
        name= "events",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "eventName")
        })
public class Event {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long eventId;

    @NotBlank
    @Size(min = 5 , max = 50)
    private String eventName;


    private Date startDate;

    private Date endDate;

    private Integer duration;

    @OneToOne
    @JoinColumn(name = "organizer_id", nullable = false)
    private Organizer organizer;

    @OneToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @OneToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @Column
    private String coverImg;

    @Enumerated(EnumType.STRING)
    private EventStatus status;

    public Event(
            String eventName,
            Organizer organizer,
            Category category,
            EventType eventType,
            Date startDate,
            Date endDate,
            Integer duration,
            Location location,
            String coverImg,
            EventStatus status
    ) {
        this.eventName = eventName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
        this.organizer = organizer;
        this.category = category;
        this.eventType = eventType;
        this.location = location;
        this.coverImg = coverImg;
        this.status = status;
    }

    @OneToMany
    private List<Ticket> tickets;




}
