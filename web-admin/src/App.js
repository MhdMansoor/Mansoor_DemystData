import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Container/LandingPage";
import LoanDetails from "./Container/LoanDetails";
import Success from "./Container/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loan-details/:id" element={<LoanDetails />} />
        <Route path="success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
