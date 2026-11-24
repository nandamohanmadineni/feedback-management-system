import { useState } from "react";

export default function AdminDashboard({
  productReviews,
  onUpdate,
  onDelete,
  onClearAll
}) {
  const [search, setSearch] = useState("");
  const [replyId, setReplyId] = useState(null);
  const [reply, setReply] = useState("");

  const filtered = productReviews.filter(item =>
    `${item.name} ${item.email} ${item.title} ${item.description} ${item.productName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const average = productReviews.length
    ? (
        productReviews.reduce(
          (sum, item) => sum + Number(item.rating || 0),
          0
        ) / productReviews.length
      ).toFixed(1)
    : "0.0";

  function saveReply(item) {
    if (!reply.trim()) {
      alert("Please enter a response.");
      return;
    }

    onUpdate("product", item.id, {
      adminResponse: reply.trim(),
      status: "Resolved"
    });

    setReplyId(null);
    setReply("");
  }

  return (
    <div className="content-stack">

      <div className="page-heading">

        <div>
          <div className="eyebrow">ADMIN PANEL</div>

          <h1>Product Review Management</h1>

          <p>
            Manage customer product reviews and responses.
          </p>
        </div>

        <button
          className="text-danger"
          onClick={onClearAll}
        >
          Clear All Reviews
        </button>

      </div>

      {/* STATISTICS */}

      <div className="stats-grid">

        <article className="stat-card">
          <span>Total Product Reviews</span>
          <strong>{productReviews.length}</strong>
        </article>

        <article className="stat-card">
          <span>Average Rating</span>
          <strong>{average}/5</strong>
        </article>

        <article className="stat-card">
          <span>Positive Reviews</span>
          <strong>
            {productReviews.filter(x => x.rating >= 4).length}
          </strong>
        </article>

        <article className="stat-card">
          <span>Pending Reviews</span>
          <strong>
            {productReviews.filter(x => x.status !== "Resolved").length}
          </strong>
        </article>

      </div>

      {/* SEARCH */}

      <input
        placeholder="Search customer or product review..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* PRODUCT REVIEWS */}

      <div className="admin-review-list">

        {filtered.map(item => (

          <article
            className="admin-review-card"
            key={item.id}
          >

            <h3>{item.productName}</h3>

            <p>Customer: {item.name}</p>

            <p>Email: {item.email}</p>

            <h4>{item.title}</h4>

            <div className="stars-line">
              {"★".repeat(Number(item.rating || 0))}
            </div>

            <p>{item.description}</p>

            {item.photo && (
              <img
                className="photo-preview"
                src={item.photo}
                alt="Customer product upload"
              />
            )}

            {/* STATUS AND ACTIONS */}

            <div className="admin-controls">

              <label>
                Status

                <select
                  value={item.status || "Pending"}
                  onChange={e =>
                    onUpdate("product", item.id, {
                      status: e.target.value
                    })
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

              </label>

              <button
                className="secondary-button"
                onClick={() => {
                  setReplyId(item.id);
                  setReply(item.adminResponse || "");
                }}
              >
                Respond
              </button>

              <button
                className="text-danger"
                onClick={() => onDelete("product", item.id)}
              >
                Delete
              </button>

            </div>

            {/* ADMIN RESPONSE */}

            {replyId === item.id && (

              <div className="reply-box">

                <textarea
                  rows="3"
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Write your response..."
                />

                <button
                  className="primary-button"
                  onClick={() => saveReply(item)}
                >
                  Send Response
                </button>

              </div>

            )}

            {item.adminResponse && (
              <div className="admin-response">
                <strong>Previous Response</strong>
                <p>{item.adminResponse}</p>
              </div>
            )}

          </article>

        ))}

      </div>

      {!filtered.length && (
        <div className="empty-panel">
          No product reviews found.
        </div>
      )}

    </div>
  );
}