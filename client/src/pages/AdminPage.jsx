import React from "react";
import AdminUsersPage from "../components/AdminUsersPage";
import AdminListingsPage from "../components/AdminListingsPage";

const AdminPage = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="admin-section">
        <h2>Manage Users</h2>
        <AdminUsersPage />
      </div>
      <div className="admin-section">
        <h2>Manage Listings</h2>
        <AdminListingsPage />
      </div>
    </div>
  );
};

export default AdminPage;
