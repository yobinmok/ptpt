package com.ssafy.ptpt.api.model.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
@Setter
@Schema(name = "BaseResponseBody", description = "기본 응답 객체")
public class BaseResponseBody {
	@Schema(name = "message", description = "결과에 대한 설명", example = "Success")
	String message = null;
	@Schema(name = "statusCode", description = "결과코드. 200이면 정상처리", example = "200")
	Integer statusCode = null;
	
	public BaseResponseBody() {}
	
	public BaseResponseBody(Integer statusCode){
		this.statusCode = statusCode;
	}
	
	public BaseResponseBody(Integer statusCode, String message){
		this.statusCode = statusCode;
		this.message = message;
	}
	
	public static BaseResponseBody of(Integer statusCode, String message) {
		BaseResponseBody body = new BaseResponseBody();
		body.message = message;
		body.statusCode = statusCode;
		return body;
	}
}
