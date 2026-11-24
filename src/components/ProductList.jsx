import { useMemo, useState } from "react";

export default function ProductList({
  products,
  onViewProduct,
  onReviewProduct
}) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map(p => p.category))
  ];

  const visible = useMemo(() => {

    return products.filter(product => {

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesSearch =
        `${product.name} ${product.description}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;

    });

  }, [products, category, search]);

  return (

    <div className="content-stack">

      <div className="page-heading">

        <div>
          <div className="eyebrow">PRODUCT CATALOGUE</div>

          <h1>Products & Reviews</h1>

          <p>
            Explore products and review items you have purchased.
          </p>
        </div>

      </div>

      <div className="filter-bar">

        <input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >

          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}

        </select>

      </div>

      <div className="products-grid">

        {visible.map(product => (

          <article
            className="catalog-card"
            key={product.id}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <div className="catalog-card-body">

              <span className="category-tag">
                {product.category}
              </span>

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <div className="card-actions">

                <button
                  className="secondary-button"
                  onClick={() => onViewProduct(product)}
                >
                  Details
                </button>

                <button
                  className="primary-button"
                  onClick={() => onReviewProduct(product)}
                >
                  Review
                </button>

              </div>

            </div>

          </article>

        ))}

      </div>

      {!visible.length && (
        <div className="empty-panel">
          No products found.
        </div>
      )}

    </div>

  );

}