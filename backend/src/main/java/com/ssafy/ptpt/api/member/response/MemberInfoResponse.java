package com.ssafy.ptpt.api.member.response;

import com.ssafy.ptpt.db.jpa.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponse {

    private Long memberId;
    private Long studyRoomId;
    private String nickName;
    private String memberPicture;
    private String oauthProvider;
    private String oauthId;
    private LocalDateTime registerTime;
    private String isWithDraw;
    private String withDrawTime;
    private Role role;

}
