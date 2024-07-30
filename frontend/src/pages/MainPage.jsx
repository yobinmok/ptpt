import { Create } from "@mui/icons-material";
import CreateRoom from "./room/CreateRoom";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router";

const MainPage = () => {
    const navigate = useNavigate();
    const MoveCreateRoom = () => {
        navigate("/createroom")
    }

    return (
        <div>메인페이지
            <div>
                <Button onClick={(MoveCreateRoom)}>방 생성하기 </Button>
            </div>

        </div>
    );
};

export default MainPage;
