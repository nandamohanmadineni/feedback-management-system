import { useState } from "react";

export default function GeneralFeedbackForm({ onSubmit }) {

  const [category, setCategory] = useState("Company service");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submit(e) {

    e.preventDefault();

    if (
      title.trim().length < 3 ||
      description.trim().length < 10
    ) {
      alert("Please enter valid feedback.");
      return;
    }

    onSubmit({
      category,
      rating,
      title: title.trim(),
      description: description.trim()
    });

    setTitle("");
    setDescription("");
    setRating(5);

  }

  return (

    <div className="content-stack">

      <h1>Company Feedback</h1>

      <p>
        Share your experience about our services and support.
      </p>

      <section className="form-panel">

        <form
          className="form-stack"
          onSubmit={submit}
        >

          <label>
            Feedback Category

            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >

              <option>Company service</option>
              <option>Customer support</option>
              <option>Suggestion</option>
              <option>Overall experience</option>

            </select>

          </label>

          <label>Rating</label>

          <div className="star-picker">

            {[1, 2, 3, 4, 5].map(n => (

              <button
                type="button"
                key={n}
                className={n <= rating ? "star active" : "star"}
                onClick={() => setRating(n)}
              >
                ★
              </button>

            ))}

          </div>

          <label>
            Feedback Title

            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

          </label>

          <label>
            Description

            <textarea
              rows="5"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />

          </label>

          <button className="primary-button">
            Submit Feedback
          </button>

        </form>

      </section>

    </div>

  );

}