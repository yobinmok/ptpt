package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntryList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_list_id")
    private Long entryListId;

    private Long studyRoomId;

    private String oauthId;

    public EntryList(Long studyRoomId, String oauthId) {
        this.studyRoomId = studyRoomId;
        this.oauthId = oauthId;
    }
}
