package com.mevent.backend.controllers;

import java.sql.SQLException;
import java.util.Optional;

import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.models.FileDB;
import com.mevent.backend.repositories.FileDBRepository;
import com.mevent.backend.security.jwt.JwtUtils;
import com.mevent.backend.services.FileStorageServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/image")
@AllArgsConstructor
public class FileController {
    FileStorageServiceImp storageService;
    FileDBRepository fileDBRepository;
    JwtUtils jwtUtils;

    @PostMapping("/upload")
    public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        System.out.println("file" + file);
        try {
            storageService.store(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    //upload organizer profile
    @PostMapping("/user/upload")
    public ResponseEntity<?> uploadUserProfileImg(@RequestParam("file") MultipartFile file){
        try{
            MessageResponse response = storageService.uploadUserProfile(file);
            return ResponseEntity
                    .ok()
                    .body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new MessageResponse("Upload error"));
        }
    }

    //upload event cover
    @PostMapping("/event/{eventId}/upload")
    public ResponseEntity<?> uploadEventCoverImg(@RequestParam("file") MultipartFile file, @PathVariable("eventId") Long eventId){
        try{
            MessageResponse response = storageService.uploadEventCover(eventId, file);
            return ResponseEntity
                    .ok()
                    .body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new MessageResponse("Upload error"));
        }
    }

    //upload organizer profile
    @PostMapping("/organizer/{organizerId}/upload")
    public ResponseEntity<?> uploadOrganizerProfileImg(
            @RequestParam("file") MultipartFile file ,
            @PathVariable("organizerId") Long organizerId){
        try{
            MessageResponse response = storageService.uploadOrganizerProfile(organizerId, file);
            return ResponseEntity
                    .ok()
                    .body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new MessageResponse("Upload error"));
        }
    }


    //Download image
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }

    //get image
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> fromDatabaseAsResEntity(@PathVariable("id") String id)
            throws SQLException {

        Optional<FileDB> userImage = fileDBRepository.findById(id);
        byte[] imageBytes = null;
        if (userImage.isPresent()) {

            imageBytes = userImage
                    .get()
                    .getData();
        }

        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
    }
}
