import { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function CreateRoom() {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    },[])

    const handleNewRoom = (e) => {
        e.preventDefault();
        const title = e.target.roomTitle.value;

        if (title.trim() == 0) {
            alert("방 제목이 공백입니다.");
            return;
        }

        e.target.roomTitle.value = "";
        socket.emit("createRoom", title);
    }

    return (
        <div className="CreateRoom">
            {/* 모달 */}
            <div className="modal">
                <div className="modal_body">
                    <h2>방 만들기 모달</h2>
                    <form className="newRoom" onSubmit={handleNewRoom}>
                    <label>
                        방 제목
                        <input type="text" className="roomTitle" name="roomTitle" placeholder="방 제목"/>
                    </label>
                    <br />
                    <label>
                        시간
                        <button type="button">00:30</button>
                        <button type="button">01:00</button>
                        <button type="button">01:30</button>
                    </label>
                    <br />
                    <label>
                        돌 색
                        <select name="stone" id="stone">
                            <option value="red">빨강</option>
                            <option value="blue">파랑</option>
                            <option value="yello">노랑</option>
                        </select>
                    </label>
                    <label>
                        <button type="submit" className="newRoomSubmit">방 만들기</button>
                    </label>
                    </form>
                </div>
            </div>
        </div>
    );
}