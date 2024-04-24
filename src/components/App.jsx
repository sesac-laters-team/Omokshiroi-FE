import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "../styles/inGame.scss";
import "../styles/WaitingRoom.scss";
import GamingRoom from './inGame/GamingRoom';
import RoomList from "./waitingRoom/RoomList";


function App() {
  return (
    <Router>
      <div className="App">
        <h2>omokshiroi</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/game">Play Omok</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/game" element={<GamingRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
