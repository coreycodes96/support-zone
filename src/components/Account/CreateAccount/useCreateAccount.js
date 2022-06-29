import { useRef, useEffect, useState } from "react";
import { api } from "../../../api";

const useCreateAccount = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    const [loading, setLoading] = useState(false);
    const [createAccount, setCreateAccount] = useState({
        username: '',
        password: '',
    });
    const [createAccountErrors, setCreateAccountErrors] = useState({
        username: '',
        password: '',
    });

    const createAnAccount = () => {
        const errorState = { username: '', password: '' };

        //Username Validation
        if (createAccount.username === "") {
            errorState.username = "Please enter a username";
        } else {
            errorState.username = "";
        }

        //Password Validation
        if (createAccount.password === "") {
            errorState.password = "Please enter a password";
        } else if (createAccount.password.length < 8) {
            errorState.password = "Password can't be less than 8 characters";
        } else if (createAccount.password.length > 255) {
            errorState.password = "Password can't be more than 255 characters";
        } else {
            errorState.password = "";
        }

        if (isMounted) setCreateAccountErrors({ ...errorState });

        if (errorState.username === "" && errorState.password === "") {
            const data = {
                username: createAccount.username,
                password: createAccount.password,
            }

            if (isMounted) setLoading(true);

            api().post("/api/account/create_account", data)
                .then(res => {
                    console.log(res.data);
                    if (isMounted) setLoading(false);
                })
                .catch(error => {
                    if (isMounted) setLoading(false);

                    const { response } = error;

                    if (response.data.username) {
                        errorState.username = response.data.username;
                        if (isMounted) setCreateAccountErrors({ ...errorState });
                    }

                    if (response.data.password) {
                        errorState.password = response.data.password;
                        if (isMounted) setCreateAccountErrors({ ...errorState });
                    }

                    if (Object.prototype.toString.call(error.response.data) === '[object Array]') {
                        for (const errorData of response.data) {
                            if (errorData.username) {
                                errorState.username = errorData.username;
                            }

                            if (errorData.password) {
                                errorState.password = errorData.password;
                            }

                            if (isMounted) setCreateAccountErrors({ ...errorState });
                        }
                    }
                })
        }
    }


    return { loading, createAccount, setCreateAccount, createAccountErrors, createAnAccount };
}

export default useCreateAccount;