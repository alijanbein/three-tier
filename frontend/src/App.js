import {
  Routes,
  BrowserRouter,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import AuthPage from "./Pages/AuthenticationPage";
import AuthContext from "./context/authContext";
import Navigation from "./Navigations";
import Profile from "./Pages/Profile";
import AddTask from "./Pages/AddTask";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const navigat = useNavigate();
  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUsername(username);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigat("/auth");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    if (token) {
      login(token, username);
    } else {
      navigat("/auth");
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, username, token, login, logout }}>
      {isLoggedIn && <Navigation />}
      <Routes>
       {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {isLoggedIn && <Route path="/" element={<Profile />} />}
        {isLoggedIn && <Route path="/add_task" element={<AddTask />} />}
       
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
