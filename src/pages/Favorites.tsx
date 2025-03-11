import { FavoritesContext } from "../context/FavoritesContext.tsx";
import MovieCard from "../components/MovieCard";
import { useContext } from "react";

export default function Favorites() {
    const favorites = useContext(FavoritesContext);

    const favoriteMovies = Array.from(favorites?.favorites?.values() || []);

    return (
        <div className="p-4">
            {favoriteMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoriteMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            rating={movie.vote_average}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No favorites added yet.</p>
            )}
        </div>
    );
}
