import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev) {
        ev.preventDefault();
        await fetch('http://localhost:4000', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <input type="text"
                placeholder="email"
                value={email}
                onChange={ev => setEmail(ev.target.value)} />
            <input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button>Register</button>

        </form>

    );
}