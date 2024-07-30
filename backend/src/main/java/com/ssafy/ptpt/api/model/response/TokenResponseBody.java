package com.ssafy.ptpt.api.model.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "TokenResponseBody", description = "토큰 응답 객체")
public class TokenResponseBody extends BaseResponseBody {
    @Schema(name = "accessToken", description = "JWT Token, Google은 ID_Token이라 명명함.", example = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNmQ5MTdiMWZlOGRlMTMzODJhYTdjYzlhMWQ2ZTkzMjYyZjMzZTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODA0Njc0Mjk1NzktN2pvdGF0NW0zOXJmZ2Rucm5wbGVpbmZpamQwcGY1YzkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODA0Njc0Mjk1NzktN2pvdGF0NW0zOXJmZ2Rucm5wbGVpbmZpamQwcGY1YzkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI1OTExNDAyMDMyMTA5MTc1MzAiLCJlbWFpbCI6ImxpbWt3b24xOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IndIMzZtYXlZU3VYVTZsYWZ1aFdLOHciLCJuYW1lIjoiS3dvbiBMaW0iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSzVfYmdZdWhYOGdCMmdyTDlMZnpzNENGZzk1dEhtR1J5WDFUYldYSTdsNXNUMWhnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ikt3b24iLCJmYW1pbHlfbmFtZSI6IkxpbSIsImlhdCI6MTcyMjMxMjU4NiwiZXhwIjoxNzIyMzE2MTg2fQ.uLTnkEiVJWuBYwoOi5J8sTvnikmholyOuxMOMsYE5oziZfMxttdfO4A3Sib_i6yPwjjbmWwnRSdVWlJRLqWmORhC0kOSr00WC7aWGJ5dptcEYiEH9huefQ6v83JRQtZReDSyYyiQXKKV6xf4wP74kT8S4P4txnmsSGj6fe4eCzuNMXmdvSbnX6jt2UpI5_S-0Mng2ULot7deCibys5IWob0PRk0Mfq2bO2QXsNsiTDJU9qLyTJNG_S380ShTu2O2cxDbxHIV-zRq7mn_CE2djI2tXrHnC679Wvb6N4mZmAETl7IOiH0TJDglJ0K_KL0BHx6FEkxYVO-7r_bP2gBAWg")
    private String accessToken = null;

    public static TokenResponseBody of(Integer statusCode, String message, String accessToken) {
        TokenResponseBody res = new TokenResponseBody();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}
