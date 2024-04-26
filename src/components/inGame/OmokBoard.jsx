import React from 'react';
import Stone from './Stone'; // 게임 보드에 표시될 돌 컴포넌트를 가져옵니다.
import MemoriedStone from './MemoriedStone'; // 힌트 및 이전 돌을 표시할 컴포넌트를 가져옵니다.
import CoordSelectArea from './CoordSelectArea'; // 돌을 놓을 좌표를 선택하는 영역 컴포넌트를 가져옵니다.
import io from 'socket.io-client'; // 소켓 통신을 위한 라이브러리를 가져옵니다.
const socket = io.connect("http://localhost:8081"); // 서버에 연결합니다.
const BOARD_OFFSET = 3.62; // % 보드의 오프셋을 설정합니다.
const BOARD_SPACE = 5.14; // % 보드의 간격을 설정합니다.

// OmokBoard 컴포넌트는 게임 보드를 표시하고 돌 놓는 위치를 관리합니다.
const OmokBoard = ({ takes }) => {
    const [inBoard, setInBoard] = React.useState(false); // 보드 내에 있는지 여부를 관리합니다.
    const [myTurn, setMyTurn] = React.useState(false); // 내 턴 여부를 관리합니다.
    const [coord, setCoord] = React.useState({}); // 선택된 좌표를 관리합니다.
    const [isGameEnd, setGameEnd] = React.useState(false); // 게임 종료 여부를 관리합니다.
  
    // 컴포넌트가 마운트될 때 소켓 이벤트 리스너를 설정합니다.
    React.useEffect(() => {
      // 플레이어의 턴이 됐을 때 호출되는 이벤트 핸들러
      socket.on("player_select", () => {
        setMyTurn(true);
      });
  
      // 플레이어 변경 시 호출되는 이벤트 핸들러
      socket.on("player_change", () => {
        setMyTurn(false);
      });

      // 컴포넌트가 언마운트될 때 소켓 이벤트 리스너를 제거합니다.
      return () => {
        socket.off("player_select");
        socket.off("player_change");
      };
    }, []);
  
    // 보드에 마우스가 진입했을 때 호출되는 이벤트 핸들러
    const handleBoardEnter = () => {
      setInBoard(true);
    };
  
    // 보드에서 마우스가 떠났을 때 호출되는 이벤트 핸들러
    const handleBoardLeave = () => {
      setInBoard(false);
    };
  
    // 보드에서 마우스가 움직였을 때 호출되는 이벤트 핸들러
    const handleBoardMove = (coord) => {
      // 이미 돌이 존재하지 않는 좌표인 경우에만 선택된 좌표를 설정합니다.
      if (takes.find((c) => c.x === coord.x && c.y === coord.y) === undefined) {
        setCoord(coord);
      }
    };
  
    // 보드에서 좌표가 선택됐을 때 호출되는 이벤트 핸들러
    const handleBoardSelect = () => {
      setMyTurn(false); // 턴을 종료합니다.
      console.log(`Select [${coord.x},${coord.y}]`); // 선택된 좌표를 콘솔에 출력합니다.
      socket.emit("player_selected", coord); // 선택된 좌표를 서버에 전달합니다.
    };
  
    return (
      <div className="omokboard">
        {/* 내 턴인 경우 좌표를 선택할 수 있는 영역을 표시합니다. */}
        {myTurn ? (
          <CoordSelectArea
            onBoardEnter={handleBoardEnter}
            onBoardMove={handleBoardMove}
            onBoardLeave={handleBoardLeave}
            onBoardSelect={handleBoardSelect}
          />
        ) : null}
        {/* 게임 보드에 놓인 돌들을 표시합니다. */}
        {takes.map((take, index) => (
          <MemoriedStone
            key={index} // 반복 생성되는 컴포넌트에는 key가 필요합니다.
            type={[index % 2 === 0 ? "black" : "white"]} // 흑돌 또는 백돌을 번갈아가며 표시합니다.
            x={take.x} // 돌의 x 좌표를 설정합니다.
            y={take.y} // 돌의 y 좌표를 설정합니다.
          />
        ))}
        {/* 마지막으로 놓인 돌을 표시합니다. */}
        {takes.length > 0 ? (
          <MemoriedStone
            type={["prev"]} // 이전 돌을 표시합니다.
            x={takes[takes.length - 1].x} // 마지막으로 놓인 돌의 x 좌표를 설정합니다.
            y={takes[takes.length - 1].y} // 마지막으로 놓인 돌의 y 좌표를 설정합니다.
          />
        ) : null}
        {/* 내 턴이고 보드 내에 마우스가 있는 경우 힌트 돌을 표시합니다. */}
        {myTurn && inBoard ? (
          <MemoriedStone
            type={[takes.length % 2 == 0 ? "black" : "white", "hint"]} // 힌트 돌을 표시합니다.
            x={coord.x} // 힌트 돌의 x 좌표를 설정합니다.
            y={coord.y} // 힌트 돌의 y 좌표를 설정합니다.
          />
        ) : null}
      </div>
    );
};

export default OmokBoard; // OmokBoard 컴포넌트를 내보냅니다.
