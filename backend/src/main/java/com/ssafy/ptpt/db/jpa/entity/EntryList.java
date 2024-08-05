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

    private Long memberId;

    public EntryList(Long studyRoomId, Long memberId) {
        this.studyRoomId = studyRoomId;
        this.memberId = memberId;
    }
}
