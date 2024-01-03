
import { BrowserRouter as Router, Routes, Route   } from "react-router-dom";
import IndexHtml from "./pages/indexhtml";
import './App.css';
import SignInHtml from "./pages/signinhtml";
import UserHtml from "./pages/userhtml";

function App() {
  return (
  <Router>
    <>
      <Routes>
        <Route path="/" element={<IndexHtml />}/>
        <Route path="sign-in" element={<SignInHtml />}/>
        <Route path="user" element={<UserHtml />}/>
      </Routes>
    </>
  </Router>
  
  )
}

export default App;
