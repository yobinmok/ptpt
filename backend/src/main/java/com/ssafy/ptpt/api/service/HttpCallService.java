package com.ssafy.ptpt.api.service;

public interface HttpCallService {

    public String Call(String method, String reqURL, String header, String param);
    public String CallwithToken(String method, String reqURL, String access_Token);
    public String CallwithToken(String method, String reqURL, String access_Token, String param);
}
