import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Outlet } from "react-router-dom";
import Welcome from "../Welcome/Welcome";

const ProtectedRoutes = () => {
    const { user } = useContext(UserContext);

    return user !== null ? <Outlet /> : <Welcome />;
}

export default ProtectedRoutes;