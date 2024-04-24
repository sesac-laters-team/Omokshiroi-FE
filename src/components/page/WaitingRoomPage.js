import { useRef, useState, useEffect } from "react";
import RoomList from "../waitingRoom/RoomList";
import io from "socket.io-client";
import CreateRoom from "../waitingRoom/CreateRoom";
import Sidebar from "../waitingRoom/SideBar";

const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function WaitingRoomPage() {
    // socket 연결
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    // 방 만들기 modal state
    const [createModal, setCreateModal] = useState(false);
    const outside = useRef();

    return (
        <div className="waiting-room">
            <div className="logoImg">OMOKSHIROI</div>
            <div className="ListTitle">
                <div>
                    <span>방 목록</span>
                </div>
                <button
                    onClick={() => {
                        setCreateModal(true);
                    }}
                    className="button btnPush btnJoin"
                >
                    방 만들기
                </button>
                {/* {createModal === true ? <CreateRoom socket={socket} /> : null} */}
                {createModal && (
                    <div
                        className="modal-outside"
                        ref={outside}
                        onClick={(e) => {
                            if (e.target === outside.current) {
                                setCreateModal(false);
                            }
                        }}
                    >
                        <div className="create-modal">
                            {createModal === true ? (
                                <CreateRoom
                                    socket={socket}
                                    setCreateModal={setCreateModal}
                                />
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
            <Sidebar width={320}></Sidebar>
            <RoomList socket={socket}></RoomList>
        </div>
    );
}
