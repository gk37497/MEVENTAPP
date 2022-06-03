package com.mevent.backend.services;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.dto.OrderDto;
import com.mevent.backend.models.Order;

import java.util.List;

public interface OrderService {

    abstract String createOrder(OrderDto orderDto);

    abstract List<Order> getAllOrders();

    abstract MessageResponse approveTax(String qrCode, Long organizerId);

    abstract MessageResponse cancelTax(String qrCode);
}
