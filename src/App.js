import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { getLocalStorage } from "./utils/localStorage/index";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";

import Welcome from "./components/Welcome/Welcome";
import CreateAccount from "./components/Account/CreateAccount/CreateAccount";
import Login from "./components/Account/Login/Login";

import ShowGroups from "./components/User/Groups/ShowGroups/ShowGroups";
import DisplayGroups from "./components/User/Groups/DisplayGroups/DisplayGroups";
import DisplayPosts from "./components/User/Posts/DisplayPosts/DisplayPosts";
import Header from "./components/Header/Header";

const App = () => {
  const [user, setUser] = useState(null);
  const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const storage = getLocalStorage('user');
    const parsedUser = JSON.parse(storage);

    setUser(parsedUser);
  }, [])

  return (
    <Router>
      <UserContext.Provider value={userValues}>
        <Header user={user} />
        {/* <div className="absolute top-0 left-0 p-5 w-full flex justify-around items-center">
          {user === null ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/create_account">Create Account</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/groups">Groups</Link>
            </>
          )}
        </div> */}

        <Routes>
          <Route path="*" element={<Navigate to="/groups" />} />
          <Route path="/" element={<Welcome />} />

          {user === null && (
            <>
              <Route path="/create_account" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route element={<ProtectedRoutes />}>
            <Route path="/groups" element={<DisplayGroups />} />
            <Route path="/group/:groupId" element={<DisplayPosts />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </Router>
  )
}

export default App;