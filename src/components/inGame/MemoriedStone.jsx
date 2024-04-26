//돌의 불필요한 리랜더링 방지
import React from 'react';
import Stone from './Stone';

const MemoriedStone = React.memo(Stone);

export default MemoriedStone;
