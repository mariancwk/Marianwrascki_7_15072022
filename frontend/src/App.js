import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from './components/SignUp/SignUp';
import Login from './pages/Login/Login';
import Feed from './pages/Feed';
import PrivateRoute from "./privatesRoutes";
import { Provider } from 'react-redux'
import store from "./redux/store";

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Feed" element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
          } />
          <Route path="*" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
