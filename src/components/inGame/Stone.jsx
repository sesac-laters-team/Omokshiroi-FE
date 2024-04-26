//돌위치 기억 

import React from 'react';

// 보드의 각 돌 사이의 간격과 보드의 오프셋을 설정합니다.
const BOARD_OFFSET = 3.62; // %
const BOARD_SPACE = 5.14; // %

// Stone 컴포넌트는 게임 보드에 표시되는 돌을 나타냅니다.
const Stone = ({ type, x, y }) => {
  let material = "";

  // type 배열에 따라 돌의 모양을 결정합니다.
  type.forEach((m) => {
    switch (m) {
      case "black":
        material += " omokboard__stone--black"; // 흑돌 클래스 추가
        break;
      case "white":
        material += " omokboard__stone--white"; // 백돌 클래스 추가
        break;
      case "hint":
        material += " omokboard__stone--hint"; // 힌트 돌 클래스 추가
        break;
      case "prev":
        material += " omokboard__stone--prev"; // 이전 돌 클래스 추가
        break;
    }
  });

  // 돌을 렌더링하고 해당 돌의 위치를 설정합니다.
  return (
    <div
      className={`omokboard__stone ${material}`}
      key={`${x}${y}`}
      style={{
        left: `${x * BOARD_SPACE + BOARD_OFFSET}%`, // x 좌표에 따른 위치 설정
        top: `${y * BOARD_SPACE + BOARD_OFFSET}%`, // y 좌표에 따른 위치 설정
      }}
    ></div>
  );
};

export default Stone;
