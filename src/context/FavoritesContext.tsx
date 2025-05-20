import {createContext, useState, ReactNode, useEffect, useContext} from "react";
import {db} from "../config/firebase";
import {collection, doc, setDoc, deleteDoc, onSnapshot} from "firebase/firestore";
import {AuthContext} from "./AuthContext";
import {Movie} from '../pages/Home';

interface ContextProps {
    favorites: Map<number, Movie>;
    setFavorite: (movie: Movie) => void;
    loading: boolean;
}

export const FavoritesContext = createContext<ContextProps | undefined>(undefined);

export function FavoritesProvider({children}: {
    children: ReactNode
}) {
    const [favorites, setFavorites] = useState(new Map<number, Movie>());
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);

    // Load favorites when user changes
    useEffect(() => {
        setLoading(true);

        // Clear favorites when user logs out
        if (!user) {
            setFavorites(new Map<number, Movie>());
            setLoading(false);
            return;
        }

        // Create a reference to the user's favorites collection
        const favoritesRef = collection(db, "users", user.uid, "favorites");

        // Listen for changes to the user's favorites
        const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
            const favMap = new Map<number, Movie>();

            snapshot.forEach((doc) => {
                const movieData = doc.data() as Movie;
                favMap.set(movieData.id, movieData);
            });

            setFavorites(favMap);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching favorites:", error);
            setLoading(false);
        });

        // Cleanup listener on unmount or when user changes
        return () => unsubscribe();
    }, [user]);

    async function setFavorite(movie: Movie) {
        if (!user) {
            // Handle non-logged in users (optional: store in local state only)
            if (!favorites.has(movie.id)) {
                setFavorites(prevState => new Map<number, Movie>(prevState).set(movie.id, movie));
            } else {
                const newMap = new Map<number, Movie>(favorites);
                newMap.delete(movie.id);
                setFavorites(newMap);
            }
            return;
        }

        // For logged-in users, update Firestore
        try {
            const movieRef = doc(db, "users", user.uid, "favorites", movie.id.toString());

            if (!favorites.has(movie.id)) {
                // Add to favorites
                await setDoc(movieRef, movie);
            } else {
                // Remove from favorites
                await deleteDoc(movieRef);
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    }

    return (
        <FavoritesContext.Provider value={{favorites, setFavorite, loading}}>
            {children}
        </FavoritesContext.Provider>
    );
}