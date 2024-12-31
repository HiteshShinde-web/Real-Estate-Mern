import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    address: {
      required: true,
      type: String,
    },
    area: {
      required: true,
      type: Number,
    },
    bath: {
      required: true,
      type: Number,
    },
    bed: {
      required: true,
      type: Number,
    },
    price: {
      required: true,
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    furnished: {
      required: true,
      type: Boolean,
    },
    parking: {
      required: true,
      type: Boolean,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imgUrl: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Trigger for Insert
listingSchema.post("save", function (doc) {
  console.log(`Trigger: A new listing was added. Title: ${doc.title}`);
  // Custom logic for insert trigger (e.g., send notifications).
});

// Trigger for Update
listingSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    console.log(`Trigger: Listing updated. ID: ${doc._id}`);
    // Custom logic for update trigger (e.g., update related collections).
  } else {
    console.log("Trigger: No listing found to update.");
  }
});

// Trigger for Delete
listingSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  console.log(`Trigger: Listing about to be deleted. ID: ${this._id}`);
  // Custom logic for delete trigger (e.g., cleanup related data).
  next();
});

// Trigger for Bulk Delete (if needed)
listingSchema.pre("deleteMany", function (next) {
  console.log(`Trigger: Bulk delete operation detected.`);
  // Custom logic for bulk deletion.
  next();
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
