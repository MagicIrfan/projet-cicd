import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.tsx";
import CompareClasses from "./pages/Compareclasses.tsx";
import Navbar from "./components/Navbar.tsx";

function NotFound() {
    return <h2>Page non trouvée</h2>;
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/compare" element={<CompareClasses />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
