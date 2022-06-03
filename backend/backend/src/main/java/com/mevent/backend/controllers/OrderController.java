package com.mevent.backend.controllers;


import com.mevent.backend.dto.OrderDto;
import com.mevent.backend.services.OrderServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/user/order")
public class OrderController {

    OrderServiceImp orderServiceImp;


    //create order by user Id
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderDto orderDto) {
        String response = orderServiceImp.createOrder(orderDto);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PutMapping("/approve/{organizerId}/{qrCode}")
    public ResponseEntity<?> approveTax(@Valid @PathVariable("organizerId") Long organizerId, @PathVariable("qrCode") String qrCode){
        return ResponseEntity
                .ok()
                .body(orderServiceImp.approveTax(qrCode,organizerId));
    }

    @PutMapping("/cancel/{qrCode}")
    public ResponseEntity<?> cancelTax(@Valid @PathVariable("qrCode") String qrCode){
        return ResponseEntity
                .ok()
                .body(orderServiceImp.cancelTax(qrCode));
    }
}
