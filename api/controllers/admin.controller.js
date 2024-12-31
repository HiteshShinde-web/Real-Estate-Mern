import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a listing
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a listing
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
