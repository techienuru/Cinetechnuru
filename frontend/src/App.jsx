import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import WatchLater from "./pages/WatchLater/WatchLater";
import Favorites from "./pages/Favorites/Favorites";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ManageProfile from "./pages/ManageProfile/ManageProfile";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
  return (
    <>
      <Router>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manage-profile" element={<ManageProfile />} />
          <Route path="/search/:searchTerm" element={<SearchResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </Router>
    </>
  );
}

export default App;
