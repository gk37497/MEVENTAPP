package com.mevent.backend.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long userId;
	private String firstName;
	private String lastName;
	private String email;
	private Long organizerId;

	public JwtResponse(
			String token,
			Long userId,
			String firstName,
			String lastName,
			String email,
			Long organizerId
	) {
		this.token = token;
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.organizerId = organizerId;
	}
}
