import { useState } from "react";

export default function Login({
  onLogin,
  onShowSignup,
  message
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("customer");

  function submit(e) {
    e.preventDefault();

    onLogin({
      email: email.trim().toLowerCase(),
      password,
      role
    });
  }

  return (

    <section className="auth-card">

      <h2>Login</h2>

      <div className="role-buttons">

        <button
          type="button"
          className={role === "customer" ? "selected" : ""}
          onClick={() => setRole("customer")}
        >
          Customer
        </button>

        <button
          type="button"
          className={role === "admin" ? "selected" : ""}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>

      </div>

      <form onSubmit={submit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {message && (
          <p className="error-message">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="login-submit"
        >
          Login
        </button>

      </form>

      <div className="signup-text">

        No account?

        <button
          type="button"
          onClick={onShowSignup}
        >
          Signup
        </button>

      </div>

    </section>

  );
}