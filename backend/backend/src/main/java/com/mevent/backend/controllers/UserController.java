package com.mevent.backend.controllers;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.models.ChosenCategories;
import com.mevent.backend.repositories.ChoseCategoriesRepository;
import com.mevent.backend.security.jwt.JwtUtils;
import com.mevent.backend.services.UserServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    UserServiceImp userServiceImp;
    ChoseCategoriesRepository choseCategoriesRepository;
    JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(){
        return ResponseEntity
                .ok()
                .body(
                        userServiceImp
                                .getProfile()
                );
    }

    @PostMapping("/follow/{organizerId}")
    public ResponseEntity<?> followOrganizer(@Valid @PathVariable("organizerId") Long organizerId) {

        MessageResponse messageResponse =
                userServiceImp
                        .followOrganizer(organizerId);
        return ResponseEntity
                .ok()
                .body(messageResponse);
    }

    @PostMapping("/unfollow/{organizerId}")
    public ResponseEntity<?> unfollowOrganizer(@Valid @PathVariable("organizerId") Long organizerId) {

        MessageResponse response = userServiceImp.unfollowOrganizer(organizerId);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PostMapping("/like/{eventId}")
    public ResponseEntity<?> likeEvent(@Valid @PathVariable("eventId") Long eventId) {
        MessageResponse response = userServiceImp.likeEvent(eventId);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PostMapping("/unlike/{eventId}")
    public ResponseEntity<?> unlikeEvent(@Valid @PathVariable("eventId") Long eventId) {
        MessageResponse messageResponse = userServiceImp.unlikeEvent(eventId);
        return ResponseEntity
                .ok()
                .body(messageResponse);
    }

    @PostMapping("/chooseCategory/{categoryId}")
    public ResponseEntity<?> chooseCategory(@Valid @PathVariable("categoryId") Long categoryId){
        if (choseCategoriesRepository.existsByUserIdAndCategoryId(jwtUtils.getUserIdFromToken(), categoryId)){
            return ResponseEntity.ok().body(new MessageResponse("already chosen"));
        }
        else {
            ChosenCategories categories = new ChosenCategories(
                    jwtUtils.getUserIdFromToken(),
                    categoryId
            );

            choseCategoriesRepository.save(categories);
            return ResponseEntity.ok().body(new MessageResponse("successfully"));
        }
    }
}
