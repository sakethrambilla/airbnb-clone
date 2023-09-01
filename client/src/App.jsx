import "./App.css";
import {Route,Router,Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Loginpage from "./pages/LoginPage";
import Layout from "./Layout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
      </Route>
    </Routes>
    
  )
}

export default App;
