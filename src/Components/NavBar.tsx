import { Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

export default function NavBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const favorites = useContext(FavoritesContext);
    const { logout, user } = useContext(AuthContext);

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    }
    function handleSignup(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        navigate(`/signup`);
    }
    function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        navigate(`/login`);
    }
    function handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        logout();
        navigate(`/`);
    }

    return (
        <nav className="flex flex-wrap items-center justify-between bg-gray-800 text-white p-4 shadow-lg">
            <div className="flex items-center gap-4">
                <Link to="/" className="hover:text-blue-400 transition">Home</Link>
                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search movies..."
                        className="px-3 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded transition">
                        Search
                    </button>
                </form>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link to='/dashboard' className="hover:text-blue-400 transition">{user.email}</Link>
                        <p className="flex items-center gap-1">
                            ⭐ <Link to="/favorites" className="hover:text-yellow-400 transition">{favorites?.favorites.size}</Link>
                        </p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition">
                            🚪 Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleSignup} className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded transition">
                            📑 Sign Up
                        </button>
                        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition">
                            👤 Login
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
