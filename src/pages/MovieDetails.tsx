import { useParams } from "react-router-dom";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReviewForm from "../Components/ReviewForm";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { lazy, Suspense } from "react";

const LazyImage = lazy(() => import("../Components/lazyImage"));

const TMDB_API_KEY = 'edf8b8bed864d5a16edf04fce73f1c1a';
const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

interface Review {
  review: string;
  userName: string;
}

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
}

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const favoritesContext = useContext(FavoritesContext);
  if (!favoritesContext) {
    throw new Error("FavoritesContext must be used within a FavoritesProvider");
  }
  const { setFavorite, favorites } = favoritesContext;
  const { user } = useContext(AuthContext);
  
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch movie details
  useEffect(() => {
    axios
      .get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  // Fetch reviews based on movie ID
  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("movieId", "==", parseInt(id)));
        const snapshot = await getDocs(q);
        setReviews(snapshot.docs.map((doc) => doc.data() as Review));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    
    fetchReviews();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  // Handle favorite button label
  const favButtonLabel = favorites.has(movie.id) ? 'Remove from Favorites' : 'Add to Favorites';

  return (
    <div className="p-4">
      <Suspense fallback={<p>Loading image...</p>}>
        <LazyImage
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-64 rounded"
          alt={movie.title}
        />
      </Suspense>
      
      <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
      <button
        onClick={() => setFavorite(movie)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {favButtonLabel}
      </button>
      
      {user && <ReviewForm movieId={movie.id} />}
      
      {reviews.length > 0 && (
        <div className="p-4">
          <h1>Reviews</h1>
          {reviews.map((r, index) => (
            <p style={{ textAlign: 'right' }} key={index}>
              <strong>{r.review}</strong>
              <br /> by: {r.userName}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}