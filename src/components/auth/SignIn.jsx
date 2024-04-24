import { useState } from "react";
// import { Socket } from "socket.io-client";
import Logo from "../common/Logo";

const Signin = ({ setOpenModal }) => {
    const [id, setId] = useState(""); // input에 입력된 id 저장
    const [pw, setPw] = useState(""); // input에 입력된 pw 저장

    const signIn = (e) => {
        e.preventDefault();
        if (id === "") {
        } else if (pw === "") {
        }
    };
    return (
        <div className="signInModal">
            <Logo />
            <form onSubmit={signIn}>
                <div className="idWrap">
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="아이디"
                    />
                </div>
                <div className="pwWrap">
                    <input
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="비밀번호"
                    />
                </div>
                <div className="loginBtnWrap">
                    <input type="submit" value="로그인" className="btn" />
                </div>
                <div>
                    {/* 회원가입 클릭 시 회원가입 페이지로 모달창 변경*/}
                    <div
                        onClick={() => setOpenModal("signUp")}
                        className="btn text"
                    >
                        <span>회원가입</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signin;
