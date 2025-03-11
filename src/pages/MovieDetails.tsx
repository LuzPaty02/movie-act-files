import {useParams} from "react-router-dom";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";
import { useEffect,useState,useContext } from "react";

const TMDB_API_KEY = 'edf8b8bed864d5a16edf04fce73f1c1a';
const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

export default function MovieDetails() {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const { setFavorite,favorites } = useContext(FavoritesContext)

    useEffect(() => {
        axios.get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`)
            .then(res => setMovie(res.data))
    }, [id]);

    if (!movie) return <p>Loading...</p>;
    let favButtonLabel = '';
    if(!favorites.has(movie.id)){
        favButtonLabel = 'Add to Favorites';
    }else{
        favButtonLabel = 'Remove from Favorites';
    }
    return (
        <div className="p-4">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                 className="rounded w-64"
                 alt="Movie Poster"/>
            <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
            <button
                onClick={() => setFavorite(movie)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {favButtonLabel}
            </button>
        </div>
    )
}