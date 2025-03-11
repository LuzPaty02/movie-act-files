import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import NavBar from "./Components/NavBar";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import MovieDetails from "./pages/MovieDetails.tsx";
import Favorites from "./pages/Favorites.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import SignUp from "./pages/SignUp.tsx";



export default function App() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <NavBar />
            <div className="flex-1 w-full flex">
                <div className="w-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/dashboard" element={
                            <ProtectedRoute><Dashboard /></ProtectedRoute>
                        } />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={
                            <ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

