package com.mevent.backend.services;

import com.mevent.backend.api.response.MessageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileStorageService {

    abstract MessageResponse uploadOrganizerProfile(Long organizerId, MultipartFile file) throws IOException;
    abstract MessageResponse uploadUserProfile(MultipartFile file) throws IOException;
    abstract MessageResponse uploadEventCover(Long eventId ,MultipartFile file) throws IOException;
}
