const items = [
  ["overview", "▦", "Overview"],
  ["products", "▣", "Products & Reviews"],
  ["purchases", "▤", "My Purchased Products"],
  ["feedback", "✎", "My Feedback"]
];

export default function Sidebar({
  active,
  onNavigate,
  user
}) {
  return (
    <aside className="sidebar">

      <div className="sidebar-label">
        WORKSPACE
      </div>

      <nav>
        {items.map(([id, icon, label]) => (
          <button
            key={id}
            className={`nav-item ${active === id ? "active" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-profile">
        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <strong>{user?.name}</strong>
          <small>Customer Account</small>
        </div>
      </div>

    </aside>
  );
}