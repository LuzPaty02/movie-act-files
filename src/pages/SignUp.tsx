import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        try {
            const resp = await createUserWithEmailAndPassword(auth, email, password);

            alert(`User ${email} created!`);
            navigate('/login');
            return resp.user.uid;

        } catch (e) {
            alert((e as Error).message);
        }
    }return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleSignup} className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg w-80">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="p-3 border border-gray-500 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500 mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="p-3 border border-gray-500 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500 mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />
            <button type="submit" className="bg-blue-500 text-white p-2">
                Sign Up
            </button>
        </form>
        </div>
    );
}
