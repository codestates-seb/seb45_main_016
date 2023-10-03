package com.codestates.server.global.security.oauth2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Data
public class KakaoMemberInfoDto {

    private Long id;

    private String connected_at;

    private Properties properties;

    @JsonProperty("kakao_account")
    private KakaoAccount kakao_account;

    @Data
    public static class Properties {
        private String nickname;
        private String profile_image;
        private String thumbnail_image;
    }

    @Data
    public static class KakaoAccount {
        private String email;
        private Boolean profile_nickname_needs_agreement;
        private Boolean profile_image_needs_aggreement;
        private profile profile;
    }

    @Data
    public static class profile {
        private String nickname;
        private String thumbnail_image_url;
        private String profile_imgae_url;
        private Boolean is_default_image;
    }
}
