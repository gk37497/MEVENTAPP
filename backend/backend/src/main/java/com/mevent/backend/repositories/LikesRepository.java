package com.mevent.backend.repositories;

import com.mevent.backend.models.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = false)
public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Modifying
    @Query("DELETE Likes l WHERE l.userId = ?1 and l.eventId = ?2")
    void unLike(Long userId, Long eventId);

    @Override
    void deleteById(Long id);

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    Optional<Likes> findByUserIdAndEventId(Long userId, Long eventId);
}
