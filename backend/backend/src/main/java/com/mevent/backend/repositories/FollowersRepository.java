package com.mevent.backend.repositories;


import com.mevent.backend.models.Followers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface FollowersRepository extends JpaRepository<Followers, Long> {

    @Modifying
    @Query("DELETE Followers f WHERE f.user.userId = ?1 and f.organizer.organizerId = ?2")
    void unFollow(Long userId, Long organizerId);

    boolean existsByUserUserIdAndOrganizerOrganizerId(Long userId, Long organizerId);

    List<Followers> findAllByUserUserId(Long userId);
    List<Followers> findAllByOrganizerOrganizerId(Long organizerId);
}
