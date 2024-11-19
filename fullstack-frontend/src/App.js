import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import ViewBook from "./pages/ViewBook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addbook" element={<AddBook />} />
          <Route exact path="/editbook/:id" element={<EditBook />} />
          <Route exact path="/viewbook/:id" element={<ViewBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
