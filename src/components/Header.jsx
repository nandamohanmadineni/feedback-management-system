export default function Header({
  user,
  onLogout,
  darkMode,
  onToggleTheme
}) {

  if (!user) {
    return (
      <header className="login-header">
        <h1>Feedback Management System</h1>
        <p>Customer Feedback & Analysis</p>
      </header>
    );
  }

  return (
    <header className="topbar">

      <div className="topbar-brand">
        <span className="brand-logo">F</span>

        <span>
          <strong>FeedbackHub</strong>
          <small>Company Product Experience</small>
        </span>
      </div>

      <div className="topbar-actions">

        <span>{user.name}</span>

        <button
          className="icon-button"
          onClick={onToggleTheme}
        >
          {darkMode ? "☀ Light" : "☾ Dark"}
        </button>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Log out
        </button>

      </div>

    </header>
  );
}