const express = require("express");
const { connectTomongoDb } = require("./connect");
const app = express();
const PORT = 3000;
const urlRouter = require("./routers/url");
const URL = require("./module/url");

// Connect to MongoDB
connectTomongoDb("enter mongo db url here")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Middlewares
app.use(express.json());
app.use("/url", urlRouter);


// Redirect
app.get("/:shortid", async (req, res) => {
  const shortid = req.params.shortid;
  try {
    // Query the database
    const entry = await URL.findOneAndUpdate(
      { shortid: shortid },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true } // Returns the updated document
    );

    // Handle case where the shortid is not found
    if (!entry) {
      console.log("ShortID not found in database");
      return res.status(404).send("Short URL not found");
    }

    // Ensure redirectURL has protocol
    let redirectURL = entry.redirectURL;
    if (
      !redirectURL.startsWith("http://") &&
      !redirectURL.startsWith("https://")
    ) {
      redirectURL = `http://${redirectURL}`;
    }

    // Redirect to the original URL
    res.redirect(redirectURL);
  } catch (error) {
    console.error("Error during redirect:", error);
    res.status(500).send("Internal Server Error");
  }
});





app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
