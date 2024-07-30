import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRoomSession } from "../../store/actions/room";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ButtonWrapper = styled.div`
  margin-top: 15px;
  float: right;
`;

const CreateRoomBlock = styled.div`
  height: 510px;
`;

const InputBlock = styled.div`
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const InputLeftWrap = styled.div`
  display: inline-block;
  margin-right: 30px;
  margin-left: ${(props) => props.marginLeft || "0px"};
  width: 60px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const InputRightWrap = styled.div`
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 17px 0;
`;

const InputForm = styled.input`
  background-color: ${(props) => props.background};
  height: 30px;
  width: ${(props) => props.width};
  border: 1px solid #919191;
  border-radius: 5px;
  padding: 2px 10px;

  outline: none;

  &::placeholder {
    font-size: 13px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 5px #707070;
  }
`;

const SelectBox = styled.select`
  background-color: white;
  height: 36px;
  width: 180px;
  border: 1px solid #919191;
  border-radius: 5px;
  padding: 0 10px;
  text-align: center;
  font-size: 15px;

  outline: none;

  &::placeholder {
    font-size: 13px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 5px #707070;
  }
`;

const PeopleLimitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 8px;
`;

const StyledButton = styled.button`
  adding: 4px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const StyledAmountWrapper = styled.div`
  margin: 0 20px;
  font-size: 20px;
  font-weight: bold;
  color: #2b2b2b;
`;

const AgesWrapper = styled.div`
  display: inline-block;
  line-height: 28px;
  width: 84px;
  color: black;
  background-color: #ffffff;
  border-radius: 4px;
  border: 2px solid #919191;
  text-align: center;
  font-size: 15px;

  & input:checked + span {
    background-color: #cedaf0;
  }
  & span {
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }

  &: hover {
    background-color: #dce5f5;
  }
`;

const CheckBoxStyled = styled.input`
  display: none;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  margin: 30px 0px;
`;

const PasswordCheckBox = styled.input`
  margin-left: 10px;
`;

const PasswordText = styled.span`
  margin-left: 5px;
  font-size: 13px;
  font-weight: bold;
  color: #707070;
`;

const CreateRoom = ({ close }) => {
    // user정보 불러와야함
    const dispatch =useDispatch();
    const navigate = useNavigate();

    // 방에 입장하기 위한 세션 정보
    const onHandleEnterRoom = (roomId) => {
        const sessionData = {
          sessionName: `Session${roomId}`,
          roomId,
        };
        dispatch(setRoomSession(sessionData));
        navigate("/room/detail");
      };

      // 방 생성 시 설정할 요소들
      const[roomInfo, setRoomInfo]  = useState({
        roomname: "",
        roomtopic: "",
        roomcomment: "",
        roompw: "", 
        roomopen: false,
        roomtime: "", // 시간으로 변경 필요
        roomhidden: false, // 익명 공개
      });

      const onRoomInfoInput = (e) => {
        setRoomInfo({...roomInfo, [e.target.name]: e.target.value});
      };

      const onRoomInfoSubmit = (e) => {
        e.preventDefault();
        // 방 이름 유효성 검사
        if(roomInfo.roomname.length === 0){
            console.log("방 이름이 없습니다.");
            alert("방 제목 설정 ");
        }
        // axios -> 방 생성 api 실행
        const roomId = "qwerabcd";
        onHandleEnterRoom(roomId);
      };

      const initState = () => {
        setRoomInfo({
        roomname: "",
        roomtopic: "",
        roomcomment: "",
        roompw: "", 
        roomopen: false,
        roomtime: "", 
        roomhidden: false, 
        });
      };
    return (
        <>
            <CreateRoomBlock>
                <ProfileWrapper>
                    <InputBlock>
                        <InputLeftWrap>방 이름</InputLeftWrap>
                        <InputRightWrap>
                        <InputForm
                            type="text"
                            value={roomInfo.roomname}
                            name="roomname"
                            placeholder="방 이름을 입력하세요."
                            onChange={onRoomInfoInput}
                            required
                            width="508px"
                            />
                        </InputRightWrap>
                    </InputBlock>
                    <InputBlock>
                        <InputLeftWrap>방 주제</InputLeftWrap>
                        <InputRightWrap>
                        <InputForm
                            type="text"
                            value={roomInfo.roomtopic}
                            name="roomtopic"
                            placeholder="방 주제를 입력하세요."
                            onChange={onRoomInfoInput}
                            required
                            width="508px"
                            />
                        </InputRightWrap>
                    </InputBlock>
                    <InputBlock>
                        <InputLeftWrap>방 설명</InputLeftWrap>
                        <InputRightWrap>
                        <InputForm
                            type="text"
                            value={roomInfo.roomcomment}
                            name="roomcomment"
                            placeholder="방 설명을 입력하세요."
                            onChange={onRoomInfoInput}
                            width="508px"
                            />
                        </InputRightWrap>
                    </InputBlock>
                    <InputBlock>
                        <InputLeftWrap>방 비밀번호</InputLeftWrap>
                        <InputRightWrap>
                        <InputForm
                            type="password"
                            value={roomInfo.roompw}
                            name="roompw"
                            placeholder="방 비번을 입력하세요."
                            onChange={onRoomInfoInput}
                            width="508px"
                            />
                        </InputRightWrap>

                        <ButtonWrapper>
                            <button onClick={onRoomInfoSubmit}>생성하기</button>
                        </ButtonWrapper>
                    </InputBlock>
                    
                </ProfileWrapper>
            </CreateRoomBlock>
        </>
    );
};
export default CreateRoom;