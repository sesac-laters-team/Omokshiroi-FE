import CreateRoom from "./CreateRoom";
// import io from "socket.io-client";
import { useState } from "react";

export default function RoomList() {
    // 방 만들기 모달 UI state
    const [createRoom, setCreateRoom] = useState(false);

    // 방 목록 불러오기
    // const [roomList, setRoomList] = useState([]);


    // const RoomInfo = (room) => {
    //     const handleEnterRoom = () => {
    //         socket.emit("roomEnter", room.title);

    //     }
    // }


    console.log(createRoom);
    return (
        <div className="RoomList">
            <div className="logoImg">로고</div>
            <section className="ShowRoomList">
                <div className="ListTitle">  
                    <div>방 목록</div>
                    <button onClick={ () => {setCreateRoom(true)} }>방 만들기</button>
                    {createRoom === true ? <CreateRoom /> : null}
                </div>
                <div className="ListRoom">
                    <ul>
                        <li>왕초보</li>
                        <li>오목한판</li>
                        <li>들어오세용</li>
                    </ul>
                </div>
            </section>
        </div>
    )
} 