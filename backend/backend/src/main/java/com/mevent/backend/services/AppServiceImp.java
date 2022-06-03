package com.mevent.backend.services;

import com.mevent.backend.models.*;
import com.mevent.backend.repositories.*;
import com.mevent.backend.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AppServiceImp implements AppService {

    CategoryRepository categoryRepository;
    OrganizerRepository organizerRepository;
    EventRepository eventRepository;
    JwtUtils jwtUtils;
    LikesRepository likesRepository;
    FollowersRepository followersRepository;

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }
}
