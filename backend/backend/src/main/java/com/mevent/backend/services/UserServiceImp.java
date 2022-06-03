package com.mevent.backend.services;

import com.mevent.backend.api.response.EventResponse;
import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.api.response.OrganizerResponse;
import com.mevent.backend.api.response.ProfileResponse;
import com.mevent.backend.models.*;
import com.mevent.backend.repositories.*;
import com.mevent.backend.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImp implements UserService{

    UserRepository userRepository;
    EventRepository eventRepository;
    OrganizerRepository organizerRepository;
    FollowersRepository followersRepository;
    LikesRepository likesRepository;
    EventServiceImp eventServiceImp;
    OrganizerServiceImp organizerServiceImp;
    JwtUtils jwtUtils;
    OrderRepository orderRepository;


    @Override
    public ProfileResponse getProfile() {
        User user = userRepository
                .findById(jwtUtils.getUserIdFromToken())
                .orElseThrow();
        List<EventResponse> likedEvents = eventServiceImp.getLikedEvents();
        List<OrganizerResponse> followedOrganizers = organizerServiceImp.getFollowedOrganizers();
        List<Order> orders = orderRepository.findAllByUserId(jwtUtils.getUserIdFromToken());

        return new ProfileResponse(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getProfileImg(),
                likedEvents,
                orders,
                followedOrganizers
        );
    }

    @Override
    public MessageResponse followOrganizer(Long organizerId) {

        if(followersRepository
                .existsByUserUserIdAndOrganizerOrganizerId(
                        jwtUtils.getUserIdFromToken(),
                        organizerId
                ))
        {
            return new MessageResponse("Already followed");
        }

        try{
            User user = userRepository.
                    findById(jwtUtils.getUserIdFromToken())
                    .orElseThrow();

            Organizer organizer = organizerRepository
                    .findById(organizerId)
                    .orElseThrow();

            Followers followers = new Followers(
                    user,
                    organizer
            );

            followersRepository.save(followers);

            return new MessageResponse(user.getFirstName() + "followed " + organizer.getOrganizerName());
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse("Following Error!!! ");
        }
    }

    @Override
    public MessageResponse unfollowOrganizer(Long organizerId) {

        if(!followersRepository
                .existsByUserUserIdAndOrganizerOrganizerId(
                        jwtUtils.getUserIdFromToken(),
                        organizerId
                )){
            return new MessageResponse("Not following");
        }
        try{
            followersRepository.unFollow(jwtUtils.getUserIdFromToken(), organizerId);
            return new MessageResponse("UnFollowed");
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse("Error !!!");
        }
    }

    @Override
    public MessageResponse likeEvent(Long eventId) {

        if (likesRepository
                .existsByUserIdAndEventId(jwtUtils.getUserIdFromToken(), eventId)
        ){
            return new MessageResponse("Already liked");
        }

        try {
            Likes likes =
                    new Likes(
                            jwtUtils.getUserIdFromToken(),
                            eventId
                    );
            likesRepository.save(likes);
            return new MessageResponse("Liked");
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse("Like Error!!!");
        }

    }

    @Override
    public MessageResponse unlikeEvent(Long eventId) {
        if (!likesRepository
                .existsByUserIdAndEventId(jwtUtils.getUserIdFromToken(), eventId)
        ){
            return new MessageResponse("Not liked");
        }
        try {
            Likes likes = likesRepository.findByUserIdAndEventId(jwtUtils.getUserIdFromToken(), eventId).orElseThrow();
            likesRepository.unLike(jwtUtils.getUserIdFromToken(), eventId);
//            likesRepository.deleteById(likes.getId());
            return new MessageResponse("Unliked");
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse("Unlike Error");
        }
    }

}
