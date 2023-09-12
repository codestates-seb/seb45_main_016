package com.codestates.server.global.security.oauth2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

@Configuration
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class KakaoMemberInfo {

    private Long KakaoId;
    private String nickname;
    private String email;
    private String profileImageUrl;

}
