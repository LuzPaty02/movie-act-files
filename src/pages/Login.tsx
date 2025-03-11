import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in both fields");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const resp = await signInWithEmailAndPassword(auth, email, password);
            alert(`User ${email} logged in!`);
            navigate('/dashboard');
            return resp.user.uid;
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <form className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg w-80">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 border border-gray-500 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500 mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 border border-gray-500 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500 mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition">
                        Login
                    </button>
                </form>
            </div>
        );
}
