package com.mevent.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "organizerName")
        })
public class Organizer {


    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long organizerId;

    @NotBlank
    @Size(max = 20)
    private String organizerName;


    @NotBlank
    @Size(max = 200)
    private String description;

    private String profileImg;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public Organizer(
            String organizerName,
            String description,
            User user
    ) {
        this.organizerName = organizerName;
        this.description = description;
        this.user = user;
    }
}
