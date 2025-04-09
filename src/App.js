import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import CardsSection from "./components/CardsSection";
import "./App.css";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import PendingOrders from "./components/PendingOrders";
import ProcessingOrders from "./components/ProcessingOrders";
import ReadyToShip from "./components/ReadyToShip";
import CompletedOrders from "./components/CompletedOrders";
import Rto from "./components/Rto"; 
import Customer from "./components/Customer";
import CouponCodePage from "./components/CouponCodePage";
import Inventory from "./components/Inventory";
import Reviews from "./components/Reviews";
import UserList from "./components/UserList";
import UpdateKarat from "./components/UpdateKarat";
import CategoriesPage from "./components/CategoriesPage";
import SubcategoriesPage from "./components/SubcategoriesPage";
import OrderDetailsPage from "./components/OrderDetailsPage";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ flex: 1 }}>
          <TopBar />

          <div style={{ padding: "20px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <CardsSection />
                    <Dashboard />
                  </>
                }
              />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/pending" element={<PendingOrders />} />
              <Route path="/processing" element={<ProcessingOrders />} />
              <Route path="/ready-to-ship" element={<ReadyToShip />} />
              <Route path="/complete" element={<CompletedOrders />} />
              <Route path="/rto" element={<Rto />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/coupon" element={<CouponCodePage />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/updatekarat" element={<UpdateKarat />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/subcategories" element={<SubcategoriesPage />} />
              <Route path="/order-details/:orderId" element={<OrderDetailsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;