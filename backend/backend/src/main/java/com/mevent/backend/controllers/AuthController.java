package com.mevent.backend.controllers;

import com.mevent.backend.api.request.LoginRequest;
import com.mevent.backend.api.request.SignupRequest;
import com.mevent.backend.api.response.JwtResponse;
import com.mevent.backend.api.response.MessageResponse;
import com.mevent.backend.models.User;
import com.mevent.backend.repositories.UserRepository;
import com.mevent.backend.security.jwt.JwtUtils;
import com.mevent.backend.security.service.UserDetailsImpl;
import com.mevent.backend.services.OrganizerServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	OrganizerServiceImp organizerServiceImp;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication =
				authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken
						(
								loginRequest.getEmail(),
								loginRequest.getPassword()
						)
		);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtUtils.generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		organizerServiceImp.getOrganizerIdByUserId(userDetails.getUserId());
		return ResponseEntity.ok(
				new JwtResponse(
						jwt,
						userDetails.getUserId(),
						userDetails.getFirstName(),
						userDetails.getLastName(),
						userDetails.getEmail(),
						organizerServiceImp.getOrganizerIdByUserId(userDetails.getUserId())
				)
		);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(
							new MessageResponse(
									"Error: Email is already in use!"
							)
					);
		}

		// Create new user's account
		User user = new User(
				signUpRequest.getFirstName(),
				signUpRequest.getLastName(),
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()
				)
		);

		userRepository.save(user);
		return ResponseEntity
				.ok(new MessageResponse("User registered successfully!"));
	}
}
