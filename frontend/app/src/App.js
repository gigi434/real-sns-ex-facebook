import { BrowserRouter, Routers, Route, Routes, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const user = useSelector(state => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
        <Route path="/profile/:username" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
