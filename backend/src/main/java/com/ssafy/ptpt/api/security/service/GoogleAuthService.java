package com.ssafy.ptpt.api.security.service;

import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface GoogleAuthService {
    String getAccessToken(String authorizationCode);
    JsonNode getUserResource(String accessToken);
    boolean verifyAccessToken(String accessToken) throws GeneralSecurityException, IOException;
}
