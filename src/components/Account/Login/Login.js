import useLogin from "./useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const {
        login,
        setLogin,
        loginErrors,
        loginUser,
        loading,
    } = useLogin(navigate);

    return (
        <div className="w-full h-auto flex justify-center items-center">
            <div className="sm:mt-56 mt-44 mx-auto p-5 sm:w-4/5 w-full h-auto">
                {/* Title */}
                <h2 className="text-2xl text-gray-700">Login</h2>

                <div className="mt-10 mx-auto p-5 w-full h-auto bg-white rounded shadow-md shadow-gray-400">
                    {/* Username */}
                    <div className="w-full">
                        <input type="text" placeholder="Username" className="p-1 w-full h-12 placeholder:text-gray-700 border-b-4 border-purple-500 outline-none" value={login.username} onChange={e => setLogin({ ...login, username: e.target.value })} />
                        {loginErrors.username !== "" && <span className="text-red-600">{loginErrors.username}</span>}
                    </div>

                    {/* Password */}
                    <div className="my-10 w-full">
                        <input type="password" placeholder="Password" className="p-1 w-full h-12 placeholder:text-gray-700 border-b-4 border-purple-500 outline-none" value={login.password} onChange={e => setLogin({ ...login, password: e.target.value })} />
                        {loginErrors.password !== "" && <span className="text-red-600">{loginErrors.password}</span>}
                    </div>

                    {/* Button */}
                    <div>
                        <button disabled={loading} onClick={() => loginUser()} className="p-3 text-white bg-purple-600 rounded">Login {loading && <FontAwesomeIcon icon={faSpinner} className="ml-1 animate-spin" />}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;