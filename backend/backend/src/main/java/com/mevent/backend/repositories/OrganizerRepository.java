package com.mevent.backend.repositories;

import com.mevent.backend.models.Organizer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = false)
public interface OrganizerRepository extends JpaRepository<Organizer, Long> {

    Boolean existsByOrganizerName(String organizerName);

    @Modifying
    @Query("update Organizer o set o.profileImg = ?1 where o.organizerId = ?2")
    void setOrganizerProfileById(String profileImg, Long organizerId);

    boolean existsByUserUserId(Long userId);

    Optional<Organizer> findByUserUserId(Long aLong);
}
