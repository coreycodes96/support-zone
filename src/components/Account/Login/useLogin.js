import { useRef, useEffect, useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { createLocalStorage } from "../../../utils/localStorage/index";
import { api } from "../../../api";

const useLogin = (navigate) => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });
    const [loginErrors, setLoginErrors] = useState({
        username: '',
        password: '',
    });

    const { setUser } = useContext(UserContext);

    const loginUser = () => {
        const errorState = { username: '', password: '' };

        //Username Validation
        if (login.username === "") {
            errorState.username = "Please enter a username";
        } else {
            errorState.username = "";
        }

        //Password Validation
        if (login.password === "") {
            errorState.password = "Please enter a password";
        } else {
            errorState.password = "";
        }

        if (isMounted) setLoginErrors({ ...errorState });

        if (errorState.username === "" && errorState.password === "") {
            const data = {
                username: login.username,
                password: login.password,
            }

            if (isMounted) setLoading(true);

            api().post("/api/account/login", data)
                .then(res => {
                    if (isMounted) setUser(JSON.stringify(res.data));
                    if (isMounted) createLocalStorage('user', JSON.stringify(res.data));
                    if (isMounted) setLoading(false);
                    if (isMounted) navigate("/groups");
                })
                .catch(error => {
                    if (isMounted) setLoading(false);

                    const { response } = error;

                    if (response.data.username) {
                        errorState.username = response.data.username;
                        if (isMounted) setLoginErrors({ ...errorState });
                    }

                    if (response.data.password) {
                        errorState.password = response.data.password;
                        if (isMounted) setLoginErrors({ ...errorState });
                    }

                    if (Object.prototype.toString.call(error.response.data) === '[object Array]') {
                        for (const errorData of response.data) {
                            if (errorData.username) {
                                errorState.username = errorData.username;
                            }

                            if (errorData.password) {
                                errorState.password = errorData.password;
                            }

                            if (isMounted) setLoginErrors({ ...errorState });
                        }
                    }
                })
        }
    }

    return { loading, login, setLogin, loginErrors, loginUser };
}

export default useLogin;