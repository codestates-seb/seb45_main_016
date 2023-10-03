package com.codestates.server.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class Response<T> {

	private Long memberId;
	private T data;

	public Response(Long memberId, T data) {
		this.memberId = memberId;
		this.data = data;
	}

}
