import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { getLocalStorage } from "./utils/localStorage/index";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Welcome from "./components/Welcome/Welcome";
import CreateAccount from "./components/Account/CreateAccount/CreateAccount";
import Login from "./components/Account/Login/Login";
import DisplayGroups from "./components/User/Groups/DisplayGroups/DisplayGroups";
import DisplayPosts from "./components/User/Posts/DisplayPosts/DisplayPosts";
import Header from "./components/Header/Header";

const App = () => {
  const [user, setUser] = useState(null);
  const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  const getUser = async () => {
    const storage = getLocalStorage('user');
    setUser(storage);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <Router>
      <UserContext.Provider value={userValues}>
        <Header user={user} />

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