import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Sidebar from "./components/Sidebar.jsx";
import CustomerOverview from "./components/CustomerOverview.jsx";
import ProductList from "./components/ProductList.jsx";
import PurchasedProducts from "./components/PurchasedProducts.jsx";
import ReviewModal from "./components/ReviewModal.jsx";
import FeedbackList from "./components/FeedbackList.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

import { products, createDemoOrders } from "./data.js";

import "./App.css";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";

// READ LOCAL STORAGE
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  // USER DATA
  const [users, setUsers] = useState(() =>
    readStorage("fms_users", [])
  );

  // PRODUCT REVIEWS ONLY
  const [productReviews, setProductReviews] = useState(() =>
    readStorage("fms_product_reviews", [])
  );

  // PURCHASE DATA
  const [ordersByEmail, setOrdersByEmail] = useState(() =>
    readStorage("fms_orders", {})
  );

  // APPLICATION STATES
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [activePage, setActivePage] = useState("overview");

  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const [reviewPurchase, setReviewPurchase] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);

  const [darkMode, setDarkMode] = useState(() =>
    readStorage("fms_dark_mode", false)
  );

  // SAVE DATA TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("fms_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "fms_product_reviews",
      JSON.stringify(productReviews)
    );
  }, [productReviews]);

  useEffect(() => {
    localStorage.setItem(
      "fms_orders",
      JSON.stringify(ordersByEmail)
    );
  }, [ordersByEmail]);

  useEffect(() => {
    localStorage.setItem(
      "fms_dark_mode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  // CUSTOMER PRODUCT REVIEWS
  const myProductReviews = useMemo(() => {
    return productReviews.filter(
      item => item.email === user?.email
    );
  }, [productReviews, user]);

  // CUSTOMER PURCHASES
  const myOrders = user
    ? ordersByEmail[user.email] || []
    : [];

  // CUSTOMER STATISTICS
  const stats = useMemo(() => {
    return {
      total: myProductReviews.length,
      product: myProductReviews.length,

      pending: myProductReviews.filter(
        item => item.status !== "Resolved"
      ).length,

      resolved: myProductReviews.filter(
        item => item.status === "Resolved"
      ).length
    };
  }, [myProductReviews]);

  // CUSTOMER SIGNUP
  function handleSignup(details) {
    if (details.email === ADMIN_EMAIL) {
      setMessage("This email is reserved for Admin.");
      return;
    }

    if (users.some(item => item.email === details.email)) {
      setMessage("Email already registered.");
      return;
    }

    const customer = {
      ...details,
      role: "customer"
    };

    setUsers(current => [...current, customer]);

    // CREATE DEMO PURCHASE RECORDS
    setOrdersByEmail(current => ({
      ...current,
      [details.email]: createDemoOrders(details.email)
    }));

    setAuthPage("login");
    setMessage("");
    setToast("Account created successfully.");
  }

  // ADMIN AND CUSTOMER LOGIN
  function handleLogin(credentials) {
    const email = credentials.email;
    const password = credentials.password;
    const role = credentials.role;

    // ADMIN LOGIN
    if (role === "admin") {
      if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
      ) {
        setUser({
          name: "Administrator",
          email: ADMIN_EMAIL,
          role: "admin"
        });

        setActivePage("overview");
        setMessage("");
        return;
      }

      setMessage("Invalid Admin email or password.");
      return;
    }

    // CUSTOMER LOGIN
    if (email === ADMIN_EMAIL) {
      setMessage("Please select Admin login.");
      return;
    }

    const found = users.find(
      item =>
        item.email === email &&
        item.password === password
    );

    if (!found) {
      setMessage("Invalid Customer email or password.");
      return;
    }

    // CREATE DEMO PURCHASES IF NOT AVAILABLE
    if (!ordersByEmail[found.email]) {
      setOrdersByEmail(current => ({
        ...current,
        [found.email]: createDemoOrders(found.email)
      }));
    }

    setUser(found);
    setActivePage("overview");
    setMessage("");
  }

  // SUBMIT PRODUCT REVIEW
  function handleProductReview(details) {
    const alreadyReviewed = productReviews.some(
      item =>
        item.email === user.email &&
        item.orderId === details.orderId
    );

    if (alreadyReviewed) {
      setToast("You have already reviewed this purchase.");
      setReviewPurchase(null);
      return;
    }

    const newReview = {
      ...details,
      id: `PR-${Date.now()}`,
      email: user.email,
      name: user.name,
      status: "Pending",
      adminResponse: "",
      date: new Date().toLocaleString(),
      createdAt: Date.now()
    };

    setProductReviews(current => [
      ...current,
      newReview
    ]);

    setReviewPurchase(null);
    setToast("Product review submitted successfully.");
  }

  // DELETE PRODUCT REVIEW
  function deleteFeedback(kind, id) {
    if (
      !window.confirm("Are you sure you want to delete this review?")
    ) {
      return;
    }

    setProductReviews(current =>
      current.filter(item => item.id !== id)
    );

    setToast("Review deleted successfully.");
  }

  // EDIT PRODUCT REVIEW
  function editFeedback(kind, id, changes) {
    setProductReviews(current =>
      current.map(item =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    );

    setToast("Review updated successfully.");
  }

  // ADMIN UPDATE PRODUCT REVIEW
  function updateAdminFeedback(kind, id, changes) {
    setProductReviews(current =>
      current.map(item =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    );

    setToast("Review updated successfully.");
  }

  // ADMIN CLEAR ALL PRODUCT REVIEWS
  function clearAllAdminFeedback() {
    if (
      !window.confirm("Delete all product reviews?")
    ) {
      return;
    }

    setProductReviews([]);
    setToast("All product reviews deleted.");
  }

  // LOGOUT
  function logout() {
    setUser(null);
    setAuthPage("login");
    setActivePage("overview");
    setMessage("");
    setReviewPurchase(null);
    setDetailProduct(null);
  }

  // APPLICATION UI
  return (
    <div className={`app-shell ${darkMode ? "dark-mode" : ""}`}>

      {/* HEADER */}
      <Header
        user={user}
        onLogout={logout}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      {/* LOGIN AND SIGNUP */}
      {!user ? (
        <main className="auth-layout">

          {authPage === "signup" ? (
            <Signup
              onSignup={handleSignup}
              onShowLogin={() => {
                setAuthPage("login");
                setMessage("");
              }}
              message={message}
            />
          ) : (
            <Login
              onLogin={handleLogin}
              onShowSignup={() => {
                setAuthPage("signup");
                setMessage("");
              }}
              message={message}
            />
          )}

        </main>

      ) : user.role === "admin" ? (

        /* ADMIN DASHBOARD */
        <main className="admin-main">
          <AdminDashboard
            productReviews={productReviews}
            onUpdate={updateAdminFeedback}
            onDelete={deleteFeedback}
            onClearAll={clearAllAdminFeedback}
          />
        </main>

      ) : (

        /* CUSTOMER DASHBOARD */
        <div className="customer-layout">

          <Sidebar
            active={activePage}
            onNavigate={setActivePage}
            user={user}
          />

          <main className="main-content">

            {/* CUSTOMER OVERVIEW */}
            {activePage === "overview" && (
              <CustomerOverview
                user={user}
                stats={stats}
                onNavigate={setActivePage}
              />
            )}

            {/* PRODUCTS */}
            {activePage === "products" && (
              <ProductList
                products={products}
                onViewProduct={setDetailProduct}
                onReviewProduct={product => {
                  const order = myOrders.find(
                    item =>
                      item.productId === product.id &&
                      item.deliveryStatus === "Delivered"
                  );

                  if (!order) {
                    setToast(
                      "This product must be delivered before reviewing."
                    );
                    return;
                  }

                  setReviewPurchase({
                    order,
                    product
                  });
                }}
              />
            )}

            {/* PURCHASED PRODUCTS */}
            {activePage === "purchases" && (
              <PurchasedProducts
                orders={myOrders}
                reviews={myProductReviews}
                products={products}
                onReview={setReviewPurchase}
              />
            )}

            {/* MY PRODUCT REVIEWS */}
            {activePage === "feedback" && (
              <FeedbackList
                productReviews={myProductReviews}
                onDelete={deleteFeedback}
                onEdit={editFeedback}
              />
            )}

          </main>
        </div>
      )}

      {/* PRODUCT REVIEW MODAL */}
      {reviewPurchase && (
        <ReviewModal
          purchase={reviewPurchase}
          onClose={() => setReviewPurchase(null)}
          onSubmit={handleProductReview}
        />
      )}

      {/* PRODUCT DETAILS MODAL */}
      {detailProduct && (
        <div className="modal-backdrop">
          <section className="modal-card">

            <button
              className="modal-close"
              onClick={() => setDetailProduct(null)}
            >
              ×
            </button>

            <img
              src={detailProduct.image}
              alt={detailProduct.name}
              className="detail-image"
            />

            <h2>{detailProduct.name}</h2>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.details}</p>

            <button
              className="primary-button"
              onClick={() => {
                const product = detailProduct;
                setDetailProduct(null);

                const order = myOrders.find(
                  item =>
                    item.productId === product.id &&
                    item.deliveryStatus === "Delivered"
                );

                if (order) {
                  setReviewPurchase({
                    order,
                    product
                  });
                } else {
                  setActivePage("purchases");
                  setToast(
                    "Only delivered purchases can be reviewed."
                  );
                }
              }}
            >
              Review Product
            </button>

          </section>
        </div>
      )}

      {/* NOTIFICATION */}
      {toast && (
        <div className="toast-message">
          {toast}

          <button
            onClick={() => setToast("")}
            style={{
              marginLeft: "12px",
              background: "transparent",
              color: "white"
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        FeedbackHub – Customer Feedback Management System
      </footer>

    </div>
  );
}