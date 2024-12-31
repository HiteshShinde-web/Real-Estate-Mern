import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminListingsPage = () => {
  const [listings, setListings] = useState([]);

  // Fetch listings when the component mounts
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/admin/listings");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  // Handle delete listing
  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(`/api/admin/listings/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  // Handle update listing
  const handleUpdateListing = async (id) => {
    const updatedData = { price: 200000 }; // Example of updating price
    try {
      const response = await axios.put(`/api/admin/listings/${id}`, updatedData);
      setListings(
        listings.map((listing) =>
          listing._id === id ? response.data : listing
        )
      );
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin: Manage Listings</h1>
      <table className="listing-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <tr key={listing._id}>
                <td>{listing.title}</td>
                <td>{listing.price}</td>
                <td>
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateListing(listing._id)}
                    className="btn-update"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No listings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminListingsPage;
