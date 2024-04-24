import CreateRoom from "./CreateRoom";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function RoomList() {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);
    // 방 만들기 모달 UI state
    const [createRoom, setCreateRoom] = useState(false);
    // const outside = useRef();

    // 방 목록 불러오기
    // const [roomList, setRoomList] = useState([
    //     {
    //         roomId: 1,
    //         title: "나는야 오목왕",
    //         timer: "sec30",
    //         roomPw: "1234",
    //         socketId: "dkddfk"
    //     },
    //     {
    //         roomId: 2,
    //         title: "왕초보만",
    //         timer: "sec60",
    //         roomPw: "",
    //         roomPw: "dwfeef",
    //     },
    // ]);

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        // socket.emit("roomListData", roomList);

        // socket.on("newRoomList", (title) => {
        //     console.log(`${title} 방 생성 완료`);

        //     const newRoomList = [
        //         ...roomList,
        //         {}
        //     ];

        //     setRoomList(newRoomList);

        // });

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
            console.log(newRoomList);

            setRoomList(newRoomList);
        });
    }, [roomList]);

    // const RoomInfo = (room) => {
    //     const handleEnterRoom = () => {
    //         socket.emit("roomEnter", room.title);

    //     }
    // }

    return (
        <div className="RoomList">
            <div className="logoImg">로고</div>
            <section className="ShowRoomList">
                <div className="ListTitle">
                    <div>방 목록</div>
                    <button
                        onClick={() => {
                            setCreateRoom(true);
                        }}
                    >
                        방 만들기
                    </button>
                    {createRoom === true ? (
                        <CreateRoom socket={socket} />
                    ) : null}
                </div>
                <div className="ListRoom" style={{ backgroundColor: "pink" }}>
                    <ul>
                        {roomList.map((room) => {
                            return (
                                <li key={room.id}>
                                    <span>{room.title}</span>
                                    <button>입장하기</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
}
