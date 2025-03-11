import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const TMDB_API_KEY = 'edf8b8bed864d5a16edf04fce73f1c1a';
const TMDB_API_URL = "https://api.themoviedb.org/3/search/movie";

export default function Search() {
    const location = useLocation();
    const [movies, setMovies] = useState([]);

    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        if (query) {
            axios.get(`${TMDB_API_URL}?api_key=${TMDB_API_KEY}&query=${query}`)
                .then(res => setMovies(res.data.results))
                .catch(error => console.error('Error fetching movies:', error));
        }
    }, [query]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average}
                />
            ))}
        </div>
    );
}