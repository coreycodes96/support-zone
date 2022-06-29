import useHeader from "./useHeader";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";

const Header = ({ user }) => {
    const {
        logoutUser,
    } = useHeader();

    return (
        <>
            <div className="absolute top-0 left-0 p-5 w-full flex sm:flex-row flex-col justify-between items-center bg-white z-20">
                <img src={Logo} className="w-12 h-12 sm:text-center" />

                <div className="sm:mt-0 mt-5 sm:w-auto w-full sm:block flex justify-center">
                    {user === null ? (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/create_account" className="mx-5">Create Account</Link>
                            <Link to="/login">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/groups" className="mx-5">Groups</Link>
                            <button onClick={() => logoutUser()} className="mx-5">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header;