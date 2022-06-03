package com.mevent.backend.services;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.OrderDto;
import com.mevent.backend.models.Event;
import com.mevent.backend.models.Order;
import com.mevent.backend.models.Ticket;
import com.mevent.backend.models.User;
import com.mevent.backend.models.enums.OrderStatus;
import com.mevent.backend.repositories.EventRepository;
import com.mevent.backend.repositories.OrderRepository;
import com.mevent.backend.repositories.TicketRepository;
import com.mevent.backend.repositories.UserRepository;
import com.mevent.backend.security.jwt.JwtUtils;
import com.mevent.backend.utils.SequenceUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImp implements OrderService{

    JwtUtils jwtUtils;
    UserRepository userRepository;
    TicketRepository ticketRepository;
    OrderRepository orderRepository;
    EventRepository eventRepository;

    @Override
    public String createOrder(OrderDto orderDto) {
    try{

        String qrCode = SequenceUtil.generateQrCode("tax");

        Ticket ticket = ticketRepository
                .findById(orderDto.getTicketId())
                .orElseThrow();

        Order order = new Order(
                new Date(),
                OrderStatus.PENDING,
                qrCode,
                jwtUtils.getUserIdFromToken(),
                ticket

        );

        orderRepository.save(order);

        return qrCode;
    }
    catch (Exception e){
        e.printStackTrace();
        return "Error !!! while create order";
    }
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository
                .findAllByUserId(jwtUtils.getUserIdFromToken());
    }

    @Override
    public MessageResponse approveTax(String qrCode,Long organizerId) {
        if (orderRepository.existsByQrCode(qrCode)){
            try{
            Order order = orderRepository.findByQrCode(qrCode).orElseThrow();
            Ticket ticket = ticketRepository.findById(order.getTicket().getTicketId()).orElseThrow();
            Event event = eventRepository.findById(ticket.getEventId()).orElseThrow();
            if (event.getOrganizer().getOrganizerId().equals(organizerId)){
                orderRepository.changeStatusByQrCode(OrderStatus.APPROVED.toString(), qrCode);
                return new MessageResponse("Approved");
            }else{
                return new MessageResponse("Not your ticket");
            }
            }catch (Exception e){
                e.printStackTrace();
                return new MessageResponse("Error while approving");
            }
            
            
        }
        else{
            return new MessageResponse("wrong qr code");
        }
    }

    @Override
    public MessageResponse cancelTax(String qrCode) {
        if (orderRepository.existsByQrCode(qrCode)){
            try{
                orderRepository.changeStatusByQrCode(OrderStatus.CANCELED.toString(), qrCode);
                return new MessageResponse("Canceled");
            }catch (Exception e){
                e.printStackTrace();
                return new MessageResponse("Error while canceling");
            }
        }
        else{
            return new MessageResponse("wrong qr code");
        }
    }
}
