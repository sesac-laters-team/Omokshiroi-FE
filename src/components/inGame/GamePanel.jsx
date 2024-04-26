import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8081");

const GamePanel = ({ roomname, blackPlayer, whitePlayer, hostId }) => {
    const [message, setMessage] = useState([]);
    const [isHost, setIsHost] = useState(false); // 방장 여부를 결정하는 상태
    const [players, setPlayers] = useState({ black: blackPlayer, white: whitePlayer }); // 플레이어 상태

    useEffect(() => {
        // 방장 여부 확인
        socket.on("check_host", () => {
            setIsHost(socket.id === hostId);
        });

        // 메시지 리스너 설정
        socket.on("message", (msg) => {
            setMessage(prev => [...prev, msg]);
        });

        // 플레이어 상태 업데이트
        socket.on("update_players", ({ blackPlayer, whitePlayer }) => {
          setPlayers({ black: blackPlayer, white: whitePlayer });
      });

        // 첫 로드 때 방장 여부 확인
        const checkHost = () => {
            setIsHost(socket.id === hostId);
        };

        checkHost();

        return () => {
            socket.off("message");
            socket.off("update_players");
            socket.off("check_host");
        };
    }, [hostId]);

    // 플레이어 선택 핸들러
    const handlePlayerChange = (color) => {
        if (!players[color]) { // 해당 자리가 비어있는 경우에만 실행
            socket.emit("player_change", color);
        }
    };

    // 플레이어 컴포넌트
    const Player = ({ color }) => (
        <div className="game-panel__playerinfo">
            {players[color] ? (
                <p className="game-panel__playername">{players[color]}</p>
            ) : (
                <button 
                    className="game-panel__playerselect" 
                    onClick={() => handlePlayerChange(color)}
                    disabled={!!players[color]}  // 플레이어가 있는지 없는지 명확히 확인
                >
                    Join as {color}
                </button>
            )}
        </div>
    );

    // 메시지 출력
    const MessageLine = msg => (
        <>
            {msg}
            <br />
        </>
    );

    return (
        <div className="game-panel">
            <h3 className="game-panel__title">{roomname}</h3>
            <div className="game-panel__players">
                <Player color="black" />
                <Player color="white" />
            </div>
            <div className="game-panel__message">
                {message.map((msg, index) => <p key={index}>{msg}</p>)}
            </div>
            <div className="game-panel__buttons">
                {isHost && (
                    <button className="game-panel__button" onClick={() => socket.emit("start_game")}>
                        게임 시작
                    </button>
                )}
                <button className="game-panel__button" onClick={() => socket.emit("player_change", "spectator")}>
                    관전하기
                </button>
                <button className="game-panel__button" onClick={() => socket.emit("room_leave")}>
                    방 나가기
                </button>
            </div>
        </div>
    );
};

export default GamePanel;
