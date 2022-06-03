package com.mevent.backend.repositories;

import com.mevent.backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = false)
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUserId(Long userId);

    boolean existsByQrCode(String qrCode);

    @Modifying
    @Query(value = "update orders set status=?1 where qr_code=?2",nativeQuery = true)
    void changeStatusByQrCode(String status, String qrCode);


    List<Order> findAllByTicketTicketId(Long ticketId);

    Optional<Order> findByQrCode(String qrCode);
}
