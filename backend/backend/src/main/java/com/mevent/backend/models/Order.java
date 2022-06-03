package com.mevent.backend.models;


import com.mevent.backend.models.enums.OrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor

@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long orderId;

    @Column
    private Date createdDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column
    @NotBlank
    private String qrCode;

    private Long userId;

    @OneToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    public Order(
            Date createdDate,
            OrderStatus status,
            String qrCode,
            Long userId,
            Ticket ticket
    ) {
        this.createdDate = createdDate;
        this.status = status;
        this.qrCode = qrCode;
        this.userId = userId;
        this.ticket = ticket;
    }
}
