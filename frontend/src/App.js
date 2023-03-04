import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter , Routes, Route,Navigate } from "react-router-dom";
import {useSelector} from  "react-redux";


function App() {
  const user = useSelector(state => state.auth.currentUser);


  
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"

        element={user ? <Home /> : <Navigate to="/login" replace />}
        
        />

          
        

        <Route  path="/login"
        element={!user ? <Login />: <Navigate to="/" replace /> }
        />
        
      

        <Route  path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace /> }
        
        />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
