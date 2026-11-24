import { useState } from "react";

export default function FeedbackList({
  productReviews,
  onDelete,
  onEdit
}) {
  const [search, setSearch] = useState("");

  const items = productReviews.filter(item =>
    `${item.title} ${item.description} ${item.productName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="content-stack">

      <h1>My Product Reviews</h1>

      <input
        placeholder="Search product reviews..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="my-feedback-list">

        {items.map(item => (

          <article
            className="feedback-card"
            key={item.id}
          >

            <div className="feedback-card-heading">

              {item.productImage && (
                <img
                  src={item.productImage}
                  alt={item.productName}
                />
              )}

              <div>
                <h3>{item.productName}</h3>

                <small>{item.date || item.purchaseDate}</small>
              </div>

              <span className="status-pill">
                {item.status}
              </span>

            </div>

            <div className="stars-line">
              {"★".repeat(Number(item.rating || 0))}
            </div>

            <p>{item.description}</p>

            {item.photo && (
              <img
                className="photo-preview"
                src={item.photo}
                alt="Product review"
              />
            )}

            {item.adminResponse && (
              <div className="admin-response">
                <strong>Company Response</strong>
                <p>{item.adminResponse}</p>
              </div>
            )}

            <div className="feedback-actions">

              <button
                className="link-button"
                onClick={() => {
                  const description = prompt(
                    "Edit your review",
                    item.description
                  );

                  if (description === null) return;

                  if (description.trim().length < 10) {
                    alert("Please enter at least 10 characters.");
                    return;
                  }

                  onEdit("product", item.id, {
                    description: description.trim()
                  });
                }}
              >
                Edit
              </button>

              <button
                className="link-button danger-link"
                onClick={() => onDelete("product", item.id)}
              >
                Delete
              </button>

            </div>

          </article>

        ))}

      </div>

      {!items.length && (
        <div className="empty-panel">
          No product reviews available.
        </div>
      )}

    </div>
  );
}