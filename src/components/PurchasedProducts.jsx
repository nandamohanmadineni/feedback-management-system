export default function PurchasedProducts({
  orders,
  reviews,
  products,
  onReview
}) {

  return (

    <div className="content-stack">

      <div className="page-heading">

        <div>
          <div className="eyebrow">ORDER HISTORY</div>

          <h1>My Purchased Products</h1>

          <p>
            Only delivered purchases can be reviewed.
          </p>
        </div>

      </div>

      <div className="purchase-list">

        {orders.map(order => {

          const product = products.find(
            p => p.id === order.productId
          );

          const reviewed = reviews.some(
            r => r.orderId === order.id
          );

          return (

            <article
              className="purchase-card"
              key={order.id}
            >

              <img
                src={product?.image}
                alt={product?.name}
              />

              <div className="purchase-main">

                <h3>{order.productName}</h3>

                <p>Order ID: {order.id}</p>

                <p>Purchase Date: {order.purchaseDate}</p>

                <div className="purchase-tags">

                  <span className="status-pill">
                    {order.deliveryStatus}
                  </span>

                  <span className="status-pill">
                    {reviewed ? "Reviewed" : "Not Reviewed"}
                  </span>

                </div>

              </div>

              <div className="purchase-action">

                {order.deliveryStatus === "Delivered" ? (

                  <button
                    className="primary-button"
                    disabled={reviewed}
                    onClick={() => onReview({
                      order,
                      product
                    })}
                  >
                    {reviewed ? "Reviewed" : "Write Review"}
                  </button>

                ) : (

                  <button disabled>
                    Available After Delivery
                  </button>

                )}

              </div>

            </article>

          );

        })}

      </div>

      {!orders.length && (
        <div className="empty-panel">
          No purchase history available.
        </div>
      )}

    </div>

  );

}