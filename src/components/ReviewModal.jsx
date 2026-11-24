import { useState } from "react";

const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

export default function ReviewModal({
  purchase,
  onClose,
  onSubmit
}) {
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  // Handle product photo upload
  function handlePhoto(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image must be 1.5 MB or smaller.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(String(reader.result));
      setError("");
    };

    reader.readAsDataURL(file);
  }

  // Submit product review
  function submit(e) {
    e.preventDefault();

    if (description.trim().length < 10) {
      setError("Please enter at least 10 characters of feedback.");
      return;
    }

    onSubmit({
      productId: purchase.product.id,

      productName: purchase.product.name,

      productCategory: purchase.product.category,

      productImage: purchase.product.image,

      orderId: purchase.order.id,

      purchaseDate: purchase.order.purchaseDate,

      rating,

      title: `${purchase.product.name} Review`,

      description: description.trim(),

      photo
    });
  }

  return (
    <div className="modal-backdrop">

      <section className="modal-card">

        {/* Close Button */}
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Review Product</h2>

        <p>
          Share your experience with this purchased product.
        </p>

        {/* Product Details */}
        <div className="modal-product">

          <img
            src={purchase.product.image}
            alt={purchase.product.name}
          />

          <div>
            <strong>{purchase.product.name}</strong>

            <small>{purchase.order.id}</small>
          </div>

        </div>

        {/* Review Form */}
        <form
          className="form-stack"
          onSubmit={submit}
        >

          {/* Star Rating */}
          <label>Rate Your Experience</label>

          <div className="star-picker">

            {[1, 2, 3, 4, 5].map(n => (

              <button
                type="button"
                key={n}
                className={
                  n <= rating ? "star active" : "star"
                }
                onClick={() => setRating(n)}
              >
                ★
              </button>

            ))}

          </div>

          <p>{rating} out of 5 stars</p>

          {/* Detailed Feedback */}
          <label>
            Your Feedback

            <textarea
              rows="5"
              placeholder="Tell us about your product experience..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />

          </label>

          {/* Product Photo Upload */}
          <label>
            Upload Product Photo (Optional)

            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
            />

          </label>

          {/* Photo Preview */}
          {photo && (
            <img
              className="photo-preview"
              src={photo}
              alt="Product Preview"
            />
          )}

          {/* Error Message */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {/* Action Buttons */}
          <div className="modal-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Submit Review
            </button>

          </div>

        </form>

      </section>

    </div>
  );
}