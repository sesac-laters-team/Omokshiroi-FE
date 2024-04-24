import { useState } from "react";
import { Socket } from "socket.io-client";

const SignUp = ({ setOpenModal }) => {
    // 초기값 및 input값을 저장하기 위한 state
    const [id, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    // 유효성 검사를 위한 state
    const [isId, setIsId] = useState(false); // id와 정규식 대조를 위한 state
    const [isIdDuplicate, setIsIdDuplicate] = useState(false); // id가 중복되지 않았는지 확인하는 state
    const [isNickname, setIsNickname] = useState(false); // 닉네임과 정규식을 대조하기 위한 state
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false); // 닉네임이 중복되지 않았는지 확인하는 state
    const [isPw, setIsPw] = useState(false);
    const [isPwConfirm, setIsPwConfirm] = useState(false);
    // 오류 발생 시 메시지 전달을 위한 state
    const [idMessage, setIdMessage] = useState(
        "아이디는 영문과 숫자를 모두 포함해 4~12자 이내로 작성해주세요."
    );
    const [nicknameMessage, setNicknameMessage] = useState(
        "닉네임은 영문 숫자 한글을 포함해 2~8자 사이로 작성해주세요."
    );
    const [pwMessage, setPwMessage] = useState(
        "비밀번호는 영문 숫자 특수문자를 모두 포함해 8~16자 사이로 작성해주세요."
    );

    const changeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        // /^[a-zA-z0-9]{4,12}$/
        const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
        if (currentId === "") {
            setIdMessage(
                "아이디는 영문과 숫자를 모두 포함해 4~12자 이내로 작성해주세요."
            );
        } else if (!idRegExp.test(currentId)) {
            setIdMessage("사용할 수 없는 아이디 입니다.");
        } else {
            setIdMessage("");
            setIsId(true);
        }
    };

    const changeNickname = (e) => {
        const currentNickname = e.target.value;
        setNickname(currentNickname);
        const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
        if (currentNickname === "") {
            setNicknameMessage(
                "닉네임은 영문 숫자 한글을 포함해 2~8자 사이로 작성해주세요."
            );
        } else if (!nicknameRegExp.test(currentNickname)) {
            setNicknameMessage("사용할 수 없는 닉네임입니다");
        } else {
            setNicknameMessage("");
            setIsNickname(true);
        }
    };

    const changePw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        if (currentPw === "") {
            setPwMessage(
                "비밀번호는 영문 숫자 특수문자를 모두 포함해 8~16자 사이로 작성해주세요."
            );
        } else if (!pwRegExp.test(currentPw)) {
            setPwMessage("사용할 수 없는 비밀번호입니다");
        } else {
            setPwMessage("사용 가능한 비밀번호입니다.");
            setIsPw(true);
        }
    };

    const signUp = () => {
        if (
            isId &&
            isIdDuplicate &&
            isNickname &&
            isNicknameDuplicate &&
            isPw &&
            isPwConfirm
        ) {
            // 모든 조건 만족시 실행시킬 구문 작성
        }
    };
    return (
        <div className="signUpModal">
            <form>
                <div>
                    <div>
                        <input
                            type="text"
                            value={id}
                            onChange={changeId}
                            placeholder="사용하실 아이디를 입력해주세요."
                        />
                    </div>
                    <div className="idMessage">{idMessage}</div>
                    <input type="button" value="중복 확인" />
                </div>
                <div>
                    <div>
                        <input
                            type="text"
                            value={nickname}
                            onChange={changeNickname}
                            placeholder="사용하실 닉네임을 입력해주세요."
                        />
                    </div>
                    <div className="nicknameMessage">{nicknameMessage}</div>
                    <div className="nicknameMessage"></div>
                    <input type="button" value="중복 확인" />
                </div>
                <div>
                    <div>
                        <input
                            type="password"
                            value={pw}
                            onChange={changePw}
                            placeholder="비밀번호를 입력해주세요."
                        />
                    </div>
                    <div className="pwMessage">{pwMessage}</div>
                </div>
                <div>
                    <div>
                        <input
                            type="password"
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            placeholder="비밀번호를 한 번 더 입력해주세요."
                        />
                    </div>
                    <div className="pwConfirmMessage">
                        비밀번호가 일치하지 않습니다.
                    </div>
                </div>
                <div>
                    <input
                        type="button"
                        className="btn"
                        value="회원가입"
                        onClick={signUp}
                    />
                </div>
                <div
                    className="btn text"
                    onClick={() => setOpenModal("signIn")}
                >
                    <span>로그인 화면으로</span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
