import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomList({ socket }) {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    const [roomList, setRoomList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 새 방 만들기
        socket.on("newRoomList", (title, timer, roomPw, roomId) => {
            const newRoomList = [
                ...roomList,
                {
                    title: title,
                    timer: timer,
                    roomPw: roomPw,
                    roomId: roomId,
                },
            ];

            console.log(`${title} 방 생성 완료`);
            setRoomList(newRoomList);
        });
    }, [roomList]);

    const gameJoin = () => {
        socket.emit("joinRoom", roomList.roomId); // 방 참가시 룸 아이디 보내기
        console.log(roomList);
        navigate("/game");
    };

    return (
        <div className="RoomList">
            <section className="ShowRoomList">
                <div className="ListRoom">
                    <ul>
                        <li>안녕하세용</li>
                        {/* roomList 받아온 값만 돌려줌 */}
                        {roomList.map((room) => {
                            return (
                                <li key={room.id}>
                                    <span>{room.title}</span>
                                    <button onClick={gameJoin}>입장하기</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
}
