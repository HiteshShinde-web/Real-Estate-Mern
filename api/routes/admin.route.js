import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllListings,
  updateListing,
  deleteListing,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../utils/verifyUser.js"; // Verify if the user is admin

const router = express.Router();

// Admin User Management
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);

// Admin Listing Management
router.get("/listings", verifyAdmin, getAllListings);
router.put("/listings/:id", verifyAdmin, updateListing);
router.delete("/listings/:id", verifyAdmin, deleteListing);

export default router;
