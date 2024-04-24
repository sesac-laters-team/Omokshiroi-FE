// 게임 방 정보, 흑백 돌 선택 및 게임 옵션을 제공하는 GamePanel 컴포넌트입니다.
import React from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:8081");

const GamePanel = ({ roomname, blackPlayer, whitePlayer }) => {
    const [message, setMessage] = React.useState([]);
    const [gameStarted, setGameStarted] = React.useState(false); // 게임 시작 여부를 관리합니다.

    React.useEffect(() => {
        socket.on("message", (msg) => {
            setMessage((value) => [...value, msg]);
        });
    }, []);

    const Player = ({ name, onClick }) => {
        return (
            <div className="game-panel__playerinfo">
                {name ? (
                    <p className="game-panel__playername">{name}</p>
                ) : (
                    <button className="game-panel__playerselect" onClick={onClick}>
                        참가
                    </button>
                )}
            </div>
        );
    };

    const MessageLine = (msg) => {
        return (
            <>
                {msg}
                <br />
            </>
        );
    };

    const blackPlayerCallback = () => {
        socket.emit("player_change", "black");
        console.log('Player change requested')
    };

    const whitePlayerCallback = () => {
        socket.emit("player_change", "white");
        console.log('Player change requested')
    };

    // 게임 시작 버튼 클릭 시 이벤트 핸들러
    const startGame = () => {
        socket.emit("start_game"); // 서버에 게임 시작 이벤트를 전달합니다.
        setGameStarted(true); // 게임이 시작되었음을 표시합니다.
    };

    return (
        <div className="game-panel">
            <div className="game-panel__main">
                <h3 className="game-panel__title">{roomname}</h3>
                <div className="game-panel__players">
                    <div className="game-panel__player">
                        <h4 className="game-panel__playercolor game-panel__playercolor--black">
                            Black
                        </h4>
                        <Player name={blackPlayer} onClick={blackPlayerCallback} />
                    </div>
                    <div className="game-panel__player">
                        <h4 className="game-panel__playercolor game-panel__playercolor--white">
                            White
                        </h4>
                        <Player name={whitePlayer} onClick={whitePlayerCallback} />
                    </div>
                </div>
                <div className="game-panel__message">
                    <p>{message.map(MessageLine)}</p>
                </div>
            </div>
            <div className="game-panel__buttons">
                {gameStarted ? null : ( // 게임이 시작되지 않은 경우에만 게임 시작 버튼을 표시합니다.
                    <button
                        className="game-panel__button"
                        onClick={startGame} // 게임 시작 버튼 클릭 시 startGame 함수를 호출합니다.
                    >
                        게임 시작
                    </button>
                )}
                <button
                    className="game-panel__button"
                    onClick={() => socket.emit("player_change", "spectator")}
                >
                    관전하기
                </button>
                <button
                    className="game-panel__button"
                    onClick={() => {
                        socket.emit("room_leave");
                    }}
                >
                    방 나가기
                </button>
            </div>
        </div>
    );
};

export default GamePanel;
