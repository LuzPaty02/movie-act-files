import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import './index.css'
import App from './App'
import { AuthProvider } from "./context/AuthContext.tsx";  // Fixed import

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <FavoritesProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </FavoritesProvider>
        </BrowserRouter>
    </StrictMode>
);
