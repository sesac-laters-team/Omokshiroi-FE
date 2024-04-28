// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux";
// import {create} from "/src/redux/store/module/waiting";

// export default function RoomList({ socket }) {
//     const initSocketConnect = () => {
//         if (!socket.connected) socket.connect();
//     };

//     useEffect(() => {
//         initSocketConnect();
//     }, []);

//     const [roomList, setRoomList] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // 새 방 만들기
//         socket.on("newRoomList", (title, timer, roomPw, roomId, roomIndex) => {
//             const newRoomList = [
//                 ...roomList,
//                 {
//                     title: title,
//                     timer: timer,
//                     roomPw: roomPw,
//                     roomId: roomId,
//                     roomIndex: roomId,
//                 },
//             ];

//             console.log(`${title} 방 생성 완료`);
//             setRoomList(newRoomList);
//         });
//     }, [roomList]);

//     const gameJoin = () => {
//         socket.emit("joinRoom", roomList.roomId); // 방 참가시 룸 아이디 보내기
//         console.log(roomList);
//         navigate("/game");
//     };

//     return (
//         <div className="RoomList">
//             <section className="ShowRoomList">
//                 <div className="ListRoom">
//                     <ul>
//                         <li>안녕하세용</li>
//                         {/* roomList 받아온 값만 돌려줌 */}
//                         {roomList.map((room) => {
//                             return (
//                                 <li key={room.roomId}>
//                                     <span>
//                                         {room.roomIndex} : {room.title}
//                                     </span>
//                                     <button onClick={gameJoin}>입장하기</button>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </div>
//             </section>
//         </div>
//     );
// }

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create } from "../../redux/store/module/waiting";

export default function RoomList({ socket }) {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.waiting.rooms);
    const nextID = useSelector((state) => state.waiting.nextID);

    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    useEffect(() => {
        // 새 방 만들기
        socket.on("newRoomList", (title, timer, roomPw, roomId, roomIndex) => {
            dispatch(
                create({
                    title: title,
                    timer: timer,
                    roomPw: roomPw,
                    roomId: roomId,
                    roomIndex: nextID, // roomIndex를 roomId로 수정해야 할 수도 있습니다.
                }),
            );
            console.log(`${title} 방 생성 완료`);
        });
    }, [socket]);

    const gameJoin = (roomId) => {
        socket.emit("joinRoom", roomId); // 방 참가시 룸 아이디 보내기
        console.log(roomId);
        // navigate("/game"); // navigate 함수가 어디서 온 것인지 확인이 필요합니다.
    };

    return (
        <div className="RoomList">
            <section className="ShowRoomList">
                <div className="ListRoom">
                    <ul>
                        {rooms.map((room) => (
                            <li key={room.roomId}>
                                <span>
                                    {room.roomIndex} : {room.title}
                                </span>
                                <button onClick={() => gameJoin(room.roomId)}>
                                    입장하기
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
