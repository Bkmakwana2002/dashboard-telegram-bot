import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import {
  Routes,
  Route,
} from 'react-router-dom';
import PrivateRoutes from "./privateRoute";

function App() {

  return (
    <>

      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Dashboard />} />
        </Route>
      </Routes>
  
    </>
  )
}

export default App
