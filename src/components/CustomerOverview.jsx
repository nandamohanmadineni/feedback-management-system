export default function CustomerOverview({
  user,
  stats,
  onNavigate
}) {
  const cards = [
    ["Total Feedback", stats.total],
    ["Product Reviews", stats.product],
    ["Pending Reviews", stats.pending],
    ["Resolved Reviews", stats.resolved]
  ];

  return (
    <div className="content-stack">

      <section className="welcome-panel">

        <div>
          <div className="eyebrow">
            CUSTOMER DASHBOARD
          </div>

          <h1>Welcome back, {user.name}</h1>

          <p>
            Thank you for sharing your product experience.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => onNavigate("products")}
        >
          Explore Products →
        </button>

      </section>

      <section className="stats-grid">

        {cards.map(([label, value]) => (
          <article className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}

      </section>

      <section className="quick-actions">

        <div>
          <h2>Share Your Product Experience</h2>

          <p>
            Review products you have purchased and help us improve.
          </p>
        </div>

        <div className="quick-buttons">

          <button
            className="primary-button"
            onClick={() => onNavigate("purchases")}
          >
            Review Purchase
          </button>

          <button
            className="secondary-button"
            onClick={() => onNavigate("feedback")}
          >
            My Reviews
          </button>

        </div>

      </section>

    </div>
  );
}