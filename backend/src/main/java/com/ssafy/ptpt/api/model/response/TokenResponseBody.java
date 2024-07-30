package com.ssafy.ptpt.api.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenResponseBody extends BaseResponseBody {
    private String accessToken = null;

    public static TokenResponseBody of(Integer statusCode, String message, String accessToken) {
        TokenResponseBody res = new TokenResponseBody();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}
