package com.codestates.server.global.security.oauth2.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "spring.security.oauth2.client.registration.kakao")
public class KakaoOAuthConfig {

    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String authorizationGrantType;
    private List<String> scope;

}
