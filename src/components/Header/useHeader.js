import { useRef, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { deleteLocalStorage } from "../../utils/localStorage";

const useHeader = () => {
    const isMounted = useRef(false);

    const { setUser } = useContext(UserContext);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    const logoutUser = () => {
        if (isMounted) setUser(null);
        if (isMounted) deleteLocalStorage('user');
    }

    return { logoutUser };
}

export default useHeader;