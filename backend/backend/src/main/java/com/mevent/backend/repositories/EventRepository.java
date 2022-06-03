package com.mevent.backend.repositories;

import com.mevent.backend.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = false)
public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {

    Boolean existsByEventName(String eventName);
    List<Event> findAllByOrganizerOrganizerId(Long organizerId);
    List<Event> findAllByCategoryCategoryId(Long categoryId);

    @Modifying
    @Query("update Event e set e.coverImg = ?1 where e.eventId = ?2")
    void setEventCoverById(String fileId, Long eventId);
}
