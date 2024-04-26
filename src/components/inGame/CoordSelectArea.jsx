// 보드 위에 돌을 놓을 위치를 선택하는 영역을 나타내는 컴포넌트입니다.
import React from 'react';
import io from 'socket.io-client'; // 소켓 통신을 위한 라이브러리를 가져옵니다.
import Stone from './Stone'; // 돌 컴포넌트를 가져옵니다.
import OmokBoard from './OmokBoard'; // 오목 보드 컴포넌트를 가져옵니다.

const socket = io.connect("http://localhost:8081"); // 서버에 연결합니다.

// 보드의 오프셋과 간격을 설정합니다.
const BOARD_OFFSET = 3.62; // %
const BOARD_SPACE = 5.14; // %

// 모바일 기기 여부를 확인하는 함수입니다.
function Mobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
}
const isMobile = Mobile(); // 모바일 기기 여부를 저장합니다.

// CoordSelectArea 컴포넌트는 보드 위에 돌을 놓을 위치를 선택하는 영역을 나타냅니다.
const CoordSelectArea = ({
    onBoardEnter,
    onBoardMove,
    onBoardLeave,
}) => {
    // 마우스 이벤트가 발생한 좌표를 가져오는 함수입니다.
    function getCoord(event) {
      let coordX = 0;
      let coordY = 0;
  
      if (!isMobile) {
        // 마우스 이벤트의 좌표를 퍼센트로 변환하여 계산합니다.
        const percentX = (event.nativeEvent.offsetX * 100.0) / event.target.clientWidth;
        const percentY = (event.nativeEvent.offsetY * 100.0) / event.target.clientHeight;
  
        // 퍼센트를 좌표로 변환합니다.
        coordX = parseInt((percentX - BOARD_OFFSET) / BOARD_SPACE + 0.5);
        coordY = parseInt((percentY - BOARD_OFFSET) / BOARD_SPACE + 0.5);
      } else {
        // 터치 이벤트의 좌표를 퍼센트로 변환하여 계산합니다.
        const bcr = event.target.getBoundingClientRect();
        const x = event.targetTouches[0].clientX - bcr.x;
        const y = event.targetTouches[0].clientY - bcr.y;
  
        const percentX = (x * 100.0) / event.target.clientWidth;
        const percentY = (y * 100.0) / event.target.clientHeight;
  
        // 퍼센트를 좌표로 변환합니다.
        coordX = parseInt((percentX - BOARD_OFFSET) / BOARD_SPACE + 0.5);
        coordY = parseInt((percentY - BOARD_OFFSET) / BOARD_SPACE - 1.5);
      }
  
      // 좌표를 보정합니다.
      if (coordX < 0) coordX = 0;
      if (coordY < 0) coordY = 0;
      if (coordX > 18) coordX = 18;
      if (coordY > 18) coordY = 18;
  
      return { x: coordX, y: coordY };
    }

    // 보드에서 좌표를 선택했을 때 호출되는 함수입니다.
    const onBoardSelect = (coord) => {
      console.log("Selected coordinates:", coord);
      socket.emit("select_coord", coord); // 선택된 좌표를 서버로 전송합니다.
    };

    // 마우스 이벤트 핸들러들입니다.
    const onMouseEnter = () => {
      if (isMobile) return;
      onBoardEnter();
    };

    const onMouseMove = (event) => {
      if (isMobile) return;
      onBoardMove(getCoord(event)); // 마우스가 움직일 때 좌표를 가져와서 이벤트 핸들러로 전달합니다.
    };

    const onMouseLeave = () => {
      if (isMobile) return;
      onBoardLeave();
    };

    const onMouseClick = (event) => {
      if (isMobile) return;
      const selectedCoord = getCoord(event);
      onBoardSelect(selectedCoord); // 마우스 클릭 이벤트가 발생했을 때 선택된 좌표를 처리합니다.
    };

    // 터치 이벤트 핸들러들입니다.
    const onTouchStart = (event) => {
      if (!isMobile) return;
      onBoardEnter();
      onBoardMove(getCoord(event));
    };

    const onTouchMove = (event) => {
      if (!isMobile) return;
      onBoardMove(getCoord(event));
    };

    const onTouchEnd = (event) => {
      if (!isMobile) return;
      onBoardLeave();
      const selectedCoord = getCoord(event);
      onBoardSelect(selectedCoord); // 터치 이벤트가 종료됐을 때 선택된 좌표를 처리합니다.
    };

    // 컴포넌트를 렌더링합니다.
    return (
      <div
        className="omokboard__coord"
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onMouseClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      ></div>
    );
};

export default CoordSelectArea; // CoordSelectArea 컴포넌트를 내보냅니다.
