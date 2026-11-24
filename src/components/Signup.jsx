import { useState } from "react";

export default function Signup({
  onSignup,
  onShowLogin,
  message
}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {

    e.preventDefault();

    onSignup({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password
    });

  }

  return (

    <section className="auth-card">

      <div className="eyebrow">CREATE ACCOUNT</div>

      <h1>Join FeedbackHub</h1>

      <p className="muted">
        Register to review products and share feedback.
      </p>

      <form
        className="form-stack"
        onSubmit={submit}
      >

        <label>
          Full Name

          <input
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
          />

        </label>

        <label>
          Email Address

          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

        </label>

        <label>
          Password

          <input
            type="password"
            minLength="6"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />

        </label>

        {message && (
          <p className="error-message">
            {message}
          </p>
        )}

        <button className="primary-button full-width">
          Create Account
        </button>

      </form>

      <p className="auth-switch">
        Already registered?

        <button
          className="link-button"
          onClick={onShowLogin}
        >
          Sign In
        </button>
      </p>

    </section>

  );

}