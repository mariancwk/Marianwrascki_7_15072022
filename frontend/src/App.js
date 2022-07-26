import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Feed from './pages/Feed';
import PrivateRoute from "./privatesRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Feed" element={
        <PrivateRoute>
          <Feed />
        </PrivateRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
