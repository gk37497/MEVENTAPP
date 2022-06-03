package com.mevent.backend.services;

import java.io.IOException;
import java.util.Objects;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.models.FileDB;
import com.mevent.backend.repositories.EventRepository;
import com.mevent.backend.repositories.FileDBRepository;
import com.mevent.backend.repositories.OrganizerRepository;
import com.mevent.backend.repositories.UserRepository;
import com.mevent.backend.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class FileStorageServiceImp implements FileStorageService {

    FileDBRepository fileDBRepository;
    OrganizerRepository organizerRepository;
    UserRepository userRepository;
    EventRepository eventRepository;
    JwtUtils jwtUtils;

    public String store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        FileDB fileDB = new FileDB(fileName, file.getContentType(), file.getBytes());
        fileDBRepository.save(fileDB);
        return fileDB.getId();
    }

    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    // Upload organizer profile image into server
    @Override
    public MessageResponse uploadOrganizerProfile(Long organizerId, MultipartFile file){
        try{
            String fileId = this.store(file);
            organizerRepository.setOrganizerProfileById(fileId, organizerId);
            return new MessageResponse("organizer profile uploaded");
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse("organizer profile img upload error !!!");
        }
    }

    @Override
    public MessageResponse uploadUserProfile(MultipartFile file){
        try{
            String fileId = this.store(file);
            userRepository.setUserProfileById(fileId, jwtUtils.getUserIdFromToken());
            return new MessageResponse("user profile uploaded");
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse("user profile img upload error !!!");
        }
    }

    @Override
    public MessageResponse uploadEventCover(Long eventId, MultipartFile file){
        try{
            String fileId = this.store(file);
            eventRepository.setEventCoverById(fileId, eventId);
            return new MessageResponse("event cover uploaded");
        }
        catch (Exception e){
            e.printStackTrace();
            return new MessageResponse(" Error !!! While event cover image uploading");
        }
    }

}
