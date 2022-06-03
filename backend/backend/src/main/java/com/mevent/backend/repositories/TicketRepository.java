package com.mevent.backend.repositories;

import com.mevent.backend.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,Long> {
    List<Ticket> findByEventId(Long eventId);
}
