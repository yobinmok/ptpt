import React, { Component } from 'react';
import './ToolbarComponent.css';
import styled from 'styled-components';
import ScreenShareActive from '../../../../assets/images//roomToolbar/screen_share_deactive.png'
import ScreenShareDeactive from '../../../../assets/images/roomToolbar/screen-share-active.png'
import CamActive from '../../../../assets/images/roomToolbar/cam_active.png'
import CamDeactive from '../../../../assets/images/roomToolbar/cam_deactive.png'
import MicOn from '../../../../assets/images/roomToolbar/mic_on.png'
import MicOff from '../../../../assets/images/roomToolbar/mic_off.png'


const ToolBar = styled.div`
  width: 100%;
  height: 60px; /* 원하는 높이로 설정 */
  color: #ffffff;
  background-color: #333333;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ToolbarMenuWrapper = styled.div`
  display: flex;
  flex-diraction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 80%;
`;
const RoomContentWrapper = styled.div`
  height: 40%;
  min-height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5px;
`;
export const RoomContentButtonWrapper = styled.div`
  width: 60px;
  height: 60px;
`;

const RoomContentButton = styled.button`
  border: none;
  width: 100%;
  height: 10%;
  border-radius: 15px;
  background-color: #676775;
  // position: ${(props) => props.position};
  cursor: pointer;
  &.active {
    background-color: #97c5ff;
  }
  &:hover {
    background-color: #97c5ff;
  }
`;

RoomContentButton.default = {
  position: "static",
};

const ChatAlertPoint = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  background-color: #ffa600;
  border: 1px solid #000;
  z-index: 99999;
`;

const FontAwesomeStyled = styled.i`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 50;
  font-family: "Font Awesome 5 Free";
`;

FontAwesomeStyled.defaultProps = {
  fontSize: "32px",
};
const MicVideoIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bdcff2;
`;

// const logo = require('../../assets/images/openvidu_logo.png');

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }


    micStatusChanged() {//
        this.props.micStatusChanged();
    }

    camStatusChanged() {//
        this.props.camStatusChanged();
    }

    screenShare() {//
        this.props.screenShare();
    }

    stopScreenShare() {//
        this.props.stopScreenShare();
    }

    toggleFullscreen() {//
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    switchCamera() {//
        this.props.switchCamera();
    }

    leaveSession() {//
        this.props.leaveSession();
    }

    toggleChat() {//
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <ToolBar>
                <ToolbarMenuWrapper>
                  <RoomContentWrapper>
                    <RoomContentButton 
                        onClick={this.toggleChat}
                        // position={"relative"}
                    />
                  </RoomContentWrapper>
                  <RoomContentWrapper>
                      <RoomContentButton onClick={this.leaveSession}>
                        나가
                      </RoomContentButton>
                  </RoomContentWrapper>
                  <RoomContentWrapper>
                      <RoomContentButton onClick={this.micStatusChanged}>
                          {/* 온오프에 따른 style */}
                          {localUser !== undefined && localUser.isAudioActive() ? (
                            // <FontAwesomeStyled className="fas fa-microphone" />
                            <img src={MicOn}  alt=""/>
                          ) : (
                            // <FontAwesomeStyled className="fas fa-microphone-slash" />
                            <img src={MicOff}  alt=""/>

                          )}
                          {/* 마이크 */}
                      </RoomContentButton>
                  </RoomContentWrapper>
                  <RoomContentWrapper>
                      <RoomContentButton onClick={this.camStatusChanged}>
                          {/* 온오프에 따른 style */}
                          {localUser !== undefined && localUser.isVideoActive() ? (
                            // <FontAwesomeStyled className="fas fa-video" />
                            <img src={CamActive}  alt=""/>
                          ) : (
                            // <FontAwesomeStyled className="fas fa-video-slash" />
                            <img src={CamDeactive}  alt=""/>
                          )}
                          {/* 캠 */}
                      </RoomContentButton>
                  </RoomContentWrapper>
                  <RoomContentWrapper>
                          {localUser !== undefined && localUser.isScreenShareActive() ? (
                            <RoomContentButton
                              onClick={this.stopScreenShare}
                              className="active"
                            >
                              {/* <FontAwesomeStyled className="fas fa-desktop active" /> */}
                              <img src={ScreenShareActive}  alt=""/>
                            </RoomContentButton>
                          ) : (
                            <RoomContentButton onClick={this.screenShare}>
                              {/* <FontAwesomeStyled className="fas fa-desktop" /> */}
                              <img src={ScreenShareDeactive}  alt=""/>
                            </RoomContentButton>
                          )}
                  </RoomContentWrapper>
                </ToolbarMenuWrapper>
            </ToolBar>
        );
    }
}
