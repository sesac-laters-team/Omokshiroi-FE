import React, { useState, useEffect } from 'react';
import OmokBoard from './OmokBoard'; // 오목 보드 컴포넌트를 가져옵니다.
import GamePanel from './GamePanel'; // 게임 패널 컴포넌트를 가져옵니다.
import io from 'socket.io-client'; // 소켓 통신을 위한 라이브러리를 가져옵니다.

const socket = io.connect("http://localhost:8081"); // 서버에 연결합니다.

// GamingRoom 컴포넌트는 공개 방에서의 게임 화면을 표시하고 관리합니다.
const GamingRoom = ({ publicRoom }) => {
  // 상태 변수를 정의합니다.
  const [roomName, setRoomName] = useState(publicRoom && publicRoom.name ? publicRoom.name : ""); // 방 이름
  const [blackPlayer, setBlackPlayer] = useState(publicRoom && publicRoom.blackPlayer ? publicRoom.blackPlayer : ""); // 흑돌 플레이어
  const [whitePlayer, setWhitePlayer] = useState(publicRoom && publicRoom.whitePlayer ? publicRoom.whitePlayer : ""); // 백돌 플레이어
  const [takes, setTakes] = useState(publicRoom && publicRoom.takes ? publicRoom.takes : []); // 돌이 놓인 위치
  const [winner, setWinner] = useState(""); // 게임 승리자

  // 페이지 타이틀 설정
  document.title = `공개방: ${roomName}`;

  // 게임 종료 시 상태 초기화 함수
  const onGameEnd = () => {
    setWinner("");
  };

  // 게임 종료 화면 컴포넌트
  const GameEndScreen = ({ winner }) => {
    const text = `${winner === "black" ? "흑돌" : "백돌"} 승리!`;
    return (
      <div className="endscreen">
        <div className="endscreen__main">
          <h3 className="endscreen__text">{text}</h3>
          <button className="endscreen__button" onClick={onGameEnd}>
            확인
          </button>
        </div>
      </div>
    );
  };

  // useEffect 훅을 사용하여 소켓 이벤트 리스너 설정
  useEffect(() => {
    // 플레이어 변경 시 호출되는 이벤트 핸들러
    socket.on("player_change", ({ blackPlayer, whitePlayer }) => {
      setBlackPlayer(blackPlayer);
      setWhitePlayer(whitePlayer);
      if (blackPlayer !== "" && whitePlayer !== "") {
        setTakes([]);
      }
    });

    // 돌을 선택했을 때 호출되는 이벤트 핸들러
    socket.on("player_selected", (coord) => {
      console.log(`player_selected [${coord.x},${coord.y}]`);
      console.log(takes);
      setTakes((t) => [...t, coord]);
    });

    // 게임 종료 시 호출되는 이벤트 핸들러
    socket.on("game_end", (winner) => {
      setWinner(winner);
    });

    // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
    return () => {
      socket.off("player_change");
      socket.off("player_selected");
      socket.off("game_end");
    };
  }, []);

  // 게임 화면을 렌더링합니다.
  return (
    <div className="gaming-room">
      {/* 오목 보드 컴포넌트를 렌더링합니다. */}
      <OmokBoard takes={takes} />
      {/* 게임 패널 컴포넌트를 렌더링합니다. */}
      <GamePanel
        roomname={roomName}
        blackPlayer={blackPlayer}
        whitePlayer={whitePlayer}
      />
      {/* 게임 종료 화면을 렌더링합니다. */}
      {winner !== "" ? <GameEndScreen winner={winner} /> : null}
    </div>
  );
};

export default GamingRoom; // GamingRoom 컴포넌트를 내보냅니다.
