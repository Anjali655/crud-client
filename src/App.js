import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import UserList from "./pages/UserList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/" element={<UserList />} />
        <Route path="*" element={<h1>No page found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
